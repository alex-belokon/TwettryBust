package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.FavoritesRepository;
import com.socialnetwork.socialnetworkapi.dao.LikesRepository;
import com.socialnetwork.socialnetworkapi.dao.PostRepository;
import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.post.AuthorDTO;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseShort;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.Favorite;
import com.socialnetwork.socialnetworkapi.model.Like;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.model.User;
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

    public List<PostResponseFull> getFullDTOlist(){
        return repo.findAll().stream().map(ent -> this.makeResponseFull(ent.getId())).toList();
    }
    public PostResponseFull save(PostRequest request){
        Post parsed = mapper.postFromDTO(request);
        Post saved  = repo.save(parsed);
        return this.makeResponseFull(saved.getId());
    }
    public List<PostResponseFull> getByAuthorId(UUID id){
        return repo.getPostsByUserId(id).stream().map(mapper::postToFullDTO).toList();
    }

    public List<PostResponseFull> getLikedBy(UUID id){
        List<Like> likesData = lrepo.getLikesByUserId(id);
        return likesData.stream().map(like -> this.makeResponseFull(like.getPostId())).toList();
    }
    public List<PostResponseFull> getFavoredBy(UUID id){
        List<Favorite> likesData = frepo.getFavoritesByUserId(id);
        return likesData.stream().map(favorite -> this.makeResponseFull(favorite.getPostId())).toList();
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
