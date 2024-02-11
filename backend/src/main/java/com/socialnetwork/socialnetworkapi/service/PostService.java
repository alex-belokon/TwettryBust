package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.PostRepository;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private PostRepository repo;
    private Facade mapper;

    public PostService(PostRepository repo, Facade mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public List<PostResponseFull> getFullDTOlist(){
        return repo.findAll().stream().map(mapper::postToFullDTO).toList();
    }

}
