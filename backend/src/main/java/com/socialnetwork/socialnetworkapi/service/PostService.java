package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.FavoritesRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.LikesRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.PostRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.post.AuthorDTO;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseShort;
import com.socialnetwork.socialnetworkapi.dto.user.PageReq;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.Favorite;
import com.socialnetwork.socialnetworkapi.model.Like;
import com.socialnetwork.socialnetworkapi.model.Post;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PostService {
    private final PostRepository repo;
    private final UserRepository urepo;
    private final LikesRepository lrepo;
    private final FavoritesRepository frepo;
    private final Facade mapper;

    private static final int pageSize = 8;

    public PostService(PostRepository repo, Facade mapper, UserRepository repo1, LikesRepository repo2, FavoritesRepository repo3) {
        this.repo = repo;
        this.mapper = mapper;
        this.urepo = repo1;
        this.lrepo = repo2;
        this.frepo = repo3;
    }
    public PostResponseFull getById(UUID id){
        return makeResponseFull(id);

    }
    private PostResponseFull makeResponseFull(UUID id){
        Post data = repo.getPostById(id);
        System.out.println(data);

        AuthorDTO author = mapper.toAuthor(urepo.findById(data.getUserId()).orElseThrow());
        System.out.println("author ID :" + author.getId() + " userName :" + author.getUserName());
        Post originalPost = data.getOriginalPostId() != null ? repo.findById(data.getOriginalPostId()).orElseThrow() : null;
        PostResponseShort opDto = originalPost != null ?mapper.postToFullDTO(originalPost) : null;
        AuthorDTO opAuthor = originalPost != null ? mapper.toAuthor(urepo.findById(originalPost.getUserId()).orElseThrow()) : null;
        Integer orPostLcount = originalPost != null ? lrepo.countAllByPostId(originalPost.getId()) : 0;
        if (opDto!=null) {
            opDto.setAuthor(opAuthor) ; opDto.setLikes(orPostLcount);
        }

        Integer likesCount   = lrepo.countAllByPostId(id);

        PostResponseFull response = mapper.postToFullDTO(data);
        response.setAuthor(author);
        response.setLikes(likesCount);
        if (opDto != null) response.setOriginalPost(opDto);

        return response;
    }
    private PostResponseFull makeResponseFullBookmarked(UUID pid, UUID uid){
        PostResponseFull resp = this.makeResponseFull(pid);
        if (frepo.getByUserIdAndPostId(uid, pid) != null) resp.setIsInBookmarks(true);
        if (lrepo.getByUserIdAndPostId(uid, pid) != null) resp.setIsLiked(true);
        return resp;
    }

    public List<PostResponseFull> getFullDTOlist(PageReq req){
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        return repo.findAll(pageable).stream().map(ent -> this.makeResponseFullBookmarked(ent.getId(), req.getUserId())).toList();
    }
    public PostResponseFull save(PostRequest request){
        Post parsed = mapper.postFromDTO(request);
        Post saved  = repo.save(parsed);
        return this.makeResponseFull(saved.getId());
    }
    public List<PostResponseFull> getByAuthorId(PageReq req){
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        return repo.getPostsByUserId(req.getUserId(), pageable).stream().map(post -> this.makeResponseFullBookmarked(post.getId(), req.getUserId())).toList();
    }

    public List<PostResponseFull> getLikedBy(PageReq req){
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        List<Like> likesData = lrepo.getLikesByUserId(req.getUserId(), pageable);
        return likesData.stream().map(like -> this.makeResponseFullBookmarked(like.getPostId(), req.getUserId())).toList();
    }
    public List<PostResponseFull> getFavoredBy(PageReq req){
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        List<Favorite> likesData = frepo.getFavoritesByUserId(req.getUserId(), pageable);
        return likesData.stream().map(favorite -> this.makeResponseFullBookmarked(favorite.getPostId(), req.getUserId())).toList();
    }
    public List<PostResponseFull> getFollowedUsersPosts(PageReq req){
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        return repo.findPostsByFollowedUsers(req.getUserId() , pageable).stream().map(post -> this.makeResponseFullBookmarked(post.getId(), req.getUserId())).toList();
    }

    public PostResponseFull edit(UUID id, PostRequest request){
        if (!repo.existsById(id)) return null;
        Post parsed = mapper.postFromDTO(request);
        parsed.setId(id);
        Post saved  = repo.save(parsed);
        return this.makeResponseFull(saved.getId());
    }

    public boolean deletePost(UUID postID) {
        if (repo.existsById(postID)) {

            lrepo.deleteAllByPostId(postID);
            repo.deleteById(postID);
            return true;
        } else {
            return false;
        }
    }
    public void saveLikedPost(UUID postId, UUID userId) {
        Optional<Post> postOptional = repo.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            Like like = new Like();
            like.setPostId(post.getId());
            lrepo.save(like);
        }
    }

}
