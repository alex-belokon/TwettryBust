package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.PostRepository;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.Post;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostService {
    private final PostRepository repo;
    private final Facade mapper;

    public PostService(PostRepository repo, Facade mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }
    public PostResponseFull getById(UUID id){
        return repo.findById(id).map(mapper::postToFullDTO).orElse(null);
    }

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
