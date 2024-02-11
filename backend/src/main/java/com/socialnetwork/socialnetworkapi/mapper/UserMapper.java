package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dto.user.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserMapper {
    private ModelMapper mapper;
    public UserMapper(ModelMapper mapper){
        this.mapper = mapper;
    }

    public UserResponseFull toFullResponse(User ent){
        return Objects.isNull(ent) ? null : mapper.map(ent, UserResponseFull.class);
    }
    public UserResponseShort toShortResponse(User ent){
        return Objects.isNull(ent) ? null : mapper.map(ent, UserResponseShort.class);
    }
    public User toEntity(UserRequest req){
        return Objects.isNull(req) ? null : mapper.map(req, User.class);
    }
}
