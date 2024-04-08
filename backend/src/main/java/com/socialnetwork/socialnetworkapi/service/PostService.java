package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.*;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityPostsRequest;
import com.socialnetwork.socialnetworkapi.dto.post.AuthorDTO;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseShort;
import com.socialnetwork.socialnetworkapi.dto.user.PageReq;
import com.socialnetwork.socialnetworkapi.exception.BadRequestException;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.Favorite;
import com.socialnetwork.socialnetworkapi.model.Like;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.model.communities.CommunityRole;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikesRepository likesRepository;
    private final FavoritesRepository favoritesRepository;
    private final CommunityMembersRepository communityMembersRepository;
    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;

    private final SubscriptionRepository subscriptionRepository;

    private final NotificationRepository notificationRepository;
    private final Facade mapper;

    private static final int pageSize = 8;

    public PostService(PostRepository postRepository, Facade mapper, UserRepository repo1, LikesRepository repo2, FavoritesRepository repo3, CommunityMembersRepository communityMembersRepository, CommentRepository commentRepository, CommunityRepository communityRepository, SubscriptionRepository subscriptionRepository, NotificationRepository notificationRepository) {
        this.postRepository = postRepository;
        this.mapper = mapper;
        this.userRepository = repo1;
        this.likesRepository = repo2;
        this.favoritesRepository = repo3;
        this.communityMembersRepository = communityMembersRepository;
        this.commentRepository = commentRepository;
        this.communityRepository = communityRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.notificationRepository = notificationRepository;
    }

    public PostResponseFull getById(UUID id, UUID currentUserId) {
        return makeResponseFullBookmarked(id, currentUserId);

    }

    private PostResponseFull makeResponseFull(UUID id) {
        Post data = postRepository.getPostById(id);
        System.out.println(data);

        AuthorDTO author = mapper.toAuthor(userRepository.findById(data.getUserId()).orElseThrow());
        System.out.println("author ID :" + author.getId() + " userName :" + author.getUserName());
        Post originalPost = data.getOriginalPostId() != null ? postRepository.findById(data.getOriginalPostId()).orElseThrow() : null;
        PostResponseShort opDto = originalPost != null ? mapper.postToFullDTO(originalPost) : null;
        AuthorDTO opAuthor = originalPost != null ? mapper.toAuthor(userRepository.findById(originalPost.getUserId()).orElseThrow()) : null;
        Integer orPostLcount = originalPost != null ? likesRepository.countAllByPostId(originalPost.getId()) : 0;

        if (opDto != null) {
            opDto.setAuthor(opAuthor);
            opDto.setLikes(orPostLcount);
        }
        author.setFollowers(subscriptionRepository.countAllByFollowingId(author.getId()));
        author.setFollowing(subscriptionRepository.countAllByFollowerId(author.getId()));

        Integer likesCount = likesRepository.countAllByPostId(id);

        PostResponseFull response = mapper.postToFullDTO(data);
        response.setAuthor(author);
        response.setLikes(likesCount);
        if (opDto != null) response.setOriginalPost(opDto);

        Integer commentsCount = commentRepository.countByPostId(id);
        response.setCommentsCount(commentsCount);

        response.setAuthorAvatar(data.getCommunityId() != null ? communityRepository.findById(data.getCommunityId()).orElseThrow().getBanner() : response.getAuthor().getAvatar());
        response.setAuthorUserName(data.getCommunityId() != null ? communityRepository.findById(data.getCommunityId()).orElseThrow().getName() : response.getAuthor().getUserName());

        return response;
    }

    private PostResponseFull makeResponseFullBookmarked(UUID pid, UUID uid) {
        PostResponseFull resp = this.makeResponseFull(pid);
        if (favoritesRepository.getByUserIdAndPostId(uid, pid) != null) resp.setIsInBookmarks(true);
        if (likesRepository.getByUserIdAndPostId(uid, pid) != null) resp.setIsLiked(true);
        if (resp.getOriginalPost() != null) {
            if (favoritesRepository.getByUserIdAndPostId(uid, resp.getOriginalPost().getId()) != null)
                resp.setOriginalPostIsInBookmarks(true);
            if (likesRepository.getByUserIdAndPostId(uid, resp.getOriginalPost().getId()) != null)
                resp.setOriginalPostIsLiked(true);
        }
        return resp;
    }

    public List<PostResponseFull> getFullDTOlist(PageReq req) {
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        return postRepository.findAll(pageable).stream().map(ent -> this.makeResponseFullBookmarked(ent.getId(), req.getUserId())).toList();
    }

    public PostResponseFull save(UUID userId, PostRequest request) {
        request.setUserId(userId);
        if (request.getCommunityId() != null) {
            if (Objects.equals(communityMembersRepository.getByCommunityIdAndUserId(request.getCommunityId(), userId).getRole(), CommunityRole.MEMBER.name())) {
                throw new BadRequestException("user with ID " + userId + " is not an administrator of a community with ID " + request.getCommunityId());
            }
        }
        Post parsed = mapper.postFromDTO(request);
        Post saved = postRepository.save(parsed);
        return this.makeResponseFull(saved.getId());
    }

    public List<PostResponseFull> getByAuthorId(PageReq req) {
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        return postRepository.getPostsByUserId(req.getUserId(), pageable).stream().map(post -> this.makeResponseFullBookmarked(post.getId(), req.getUserId())).toList();
    }

    public List<PostResponseFull> getLikedBy(PageReq req) {
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        List<Like> likesData = likesRepository.getLikesByUserId(req.getUserId(), pageable);
        return likesData.stream().map(like -> this.makeResponseFullBookmarked(like.getPostId(), req.getUserId())).toList();
    }

    public List<PostResponseFull> getFavoredBy(PageReq req) {
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        List<Favorite> likesData = favoritesRepository.getFavoritesByUserId(req.getUserId(), pageable);
        return likesData.stream().map(favorite -> this.makeResponseFullBookmarked(favorite.getPostId(), req.getUserId())).toList();
    }

    public List<PostResponseFull> getFollowedUsersPosts(PageReq req) {
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        return postRepository.findPostsByFollowedUsers(req.getUserId(), pageable).stream().map(post -> this.makeResponseFullBookmarked(post.getId(), req.getUserId())).toList();
    }

    public List<PostResponseFull> getCommunityPostsPaged(CommunityPostsRequest req) {
        System.out.println(req.getPageSize());
        Pageable pageable = PageRequest.of(req.getPage(), req.getPageSize(), Sort.by("createdAt").descending());
        List<Post> data = postRepository.findAllByCommunityId(req.getCommunityId(), pageable);
        return data.stream().map(post -> this.makeResponseFullBookmarked(post.getId(), req.getCurrentUserId())).toList();
    }

    public PostResponseFull edit(UUID userId, UUID id, PostRequest request) {
        if (!postRepository.existsById(id)) return null;
        if (postRepository.getPostById(id).getUserId().equals(userId)) return null;
        Post parsed = mapper.postFromDTO(request);
        parsed.setId(id);
        Post saved = postRepository.save(parsed);
        return this.makeResponseFull(saved.getId());
    }

    public boolean deletePost(UUID userId, UUID postID) {
        if (postRepository.existsById(postID)) {
            if (postRepository.getPostById(postID).getUserId().equals(userId)) {

                try {
                    notificationRepository.deleteAllByPostId(postID);
                    likesRepository.       deleteAllByPostId(postID);
                    favoritesRepository.   deleteAllByPostId(postID);
                    commentRepository.     deleteAllByPostId(postID);
                    postRepository.        deleteById       (postID);
                    postRepository.deleteAllByOriginalPostId(postID);

                    return true;
                }catch (Exception ex){
                    System.out.println(ex);
                }

                return true;

            }
            return false;
        } else {
            return false;
        }
    }

    public void saveLikedPost(UUID postId, UUID userId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            Like like = new Like();
            like.setPostId(post.getId());
            likesRepository.save(like);
        }
    }

}
