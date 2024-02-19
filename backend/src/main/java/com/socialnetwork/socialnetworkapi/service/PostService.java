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

import java.util.List;
import java.util.UUID;

@Service
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

        AuthorDTO author = mapper.toAuthor(urepo.findById(data.getUserId()).get());
        System.out.println("author ID :" + author.getId() + " userName :" + author.getUserName());
        Post originalPost = data.getOriginalPostId() != null ? repo.findById(data.getOriginalPostId()).get() : null;
        PostResponseShort opDto = originalPost != null ?mapper.postToFullDTO(originalPost) : null;
        AuthorDTO opAuthor = originalPost != null ? mapper.toAuthor(urepo.findById(originalPost.getUserId()).get()) : null;
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
        Favorite favorite = frepo.getByUserIdAndPostId(uid, pid);
        if (favorite!= null) resp.setIsInBookmarks(true);
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
    public List<PostResponseFull> getByAuthorId(UUID uid){
        return repo.getPostsByUserId(uid).stream().map(post -> this.makeResponseFullBookmarked(post.getId(), uid)).toList();
    }

    public List<PostResponseFull> getLikedBy(UUID id){
        List<Like> likesData = lrepo.getLikesByUserId(id);
        return likesData.stream().map(like -> this.makeResponseFullBookmarked(like.getPostId(), id)).toList();
    }
    public List<PostResponseFull> getFavoredBy(UUID id){
        List<Favorite> likesData = frepo.getFavoritesByUserId(id);
        return likesData.stream().map(favorite -> this.makeResponseFullBookmarked(favorite.getPostId(), id)).toList();
    }
    public List<PostResponseFull> getFollowedUsersPosts(PageReq req){
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        return repo.findPostsByFollowedUsers(req.getUserId() , pageable).stream().map(post -> this.makeResponseFullBookmarked(post.getId(), req.getUserId())).toList();
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

    public boolean deleteUser(UUID userId) {
        if (repo.existsById(userId)) {
            repo.deleteById(userId);
            return true;
        } else {
            return false;
        }
    }
}
