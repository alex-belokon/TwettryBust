package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dto.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.UserResponse;
import com.socialnetwork.socialnetworkapi.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class UserMapper {
    @Autowired private ModelMapper mapper;

    public User toEntity(UserRequest req){
        return Objects.isNull(req)? null : mapper.map(req, User.class);
    }

    public UserResponse toResponse(User ent){
        return Objects.isNull(ent)? null : mapper.map(ent, UserResponse.class);
    }
}
