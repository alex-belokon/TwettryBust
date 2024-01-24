package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dto.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.UserResponse;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Facade {
    @Autowired UserMapper userMapper;

    public User userFromDTO(UserRequest req) {
        return userMapper.toEntity(req);
    }
    public UserResponse userToDTO(User ent){
        return userMapper.toResponse(ent);
    }

}
