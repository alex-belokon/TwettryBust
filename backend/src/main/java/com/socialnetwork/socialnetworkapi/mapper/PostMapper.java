package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseShort;
import com.socialnetwork.socialnetworkapi.model.Post;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class PostMapper {
    private ModelMapper modelMapper;

    public PostResponseShort toResponseShort(Post ent){
        return Objects.isNull(ent) ? null : modelMapper.map(ent, PostResponseShort.class);
    }

    public PostResponseFull toResponseFull(Post ent){
        return Objects.isNull(ent) ? null : modelMapper.map(ent, PostResponseFull.class);
    }

}