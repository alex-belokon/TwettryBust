package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.model.Post;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class PostMapper {
    private final ModelMapper modelMapper;

    public PostMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public PostMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public PostResponseFull toResponseFull(Post ent){
        return Objects.isNull(ent) ? null : modelMapper.map(ent, PostResponseFull.class);
    }
    public PostResponseShort toResponseShort(Post ent){
        return Objects.isNull(ent)? null : modelMapper.map(ent, PostResponseShort.class);
    }
    public Post toEntity(PostRequest req){
        return Objects.isNull(req) ? null : modelMapper.map(req, Post.class);
    }

}
