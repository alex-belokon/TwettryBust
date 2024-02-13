package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.PostRepository;
import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseShort;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostService {
    private final PostRepository repo;
    private final UserRepository urepo;
    private final Facade mapper;

    public PostService(PostRepository repo, Facade mapper, UserRepository repo1) {
        this.repo = repo;
        this.mapper = mapper;
        this.urepo = repo1;
    }
//    public PostResponseFull getById(UUID id){
//        PostResponseFull response;
//        Post data = repo.findById(id).get();
//        User author = urepo.findById(data.getUserId()).get();
//        Post originalPost = data.getOriginalPostId() != null ? repo.findById(data.getOriginalPostId()).get() : null;
//        User opAuthor = originalPost != null ? urepo.findById(originalPost.getUserId()).get() : null;
//        response = mapper.postToFullDTO(data);
//
//    }

    public List<PostResponseFull> getFullDTOlist(){
        return repo.findAll().stream().map(mapper::postToFullDTO).toList();
    }
    public PostResponseFull save(PostRequest request){
        Post parsed = mapper.postFromDTO(request);
        Post saved  = repo.save(parsed);
        return mapper.postToFullDTO(saved);
    }
    public List<PostResponseFull> getByAuthorId(UUID id){
        return repo.getPostsByUserId(id).stream().map(mapper::postToFullDTO).toList();
    }
}
