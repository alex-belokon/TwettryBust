package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dto.user.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.stereotype.Service;

@Service
public class Facade {
    final UserMapper userMapper;

    public Facade (UserMapper userMapper) {
        this.userMapper = userMapper;
    }
    public User userFromDTO(UserRequest req) {
        return userMapper.toEntity(req);
    }
    public UserResponseFull userToFullDTO(User ent){
        return userMapper.toFullResponse(ent);
    }
    public UserResponseShort userToShortDTO(User ent){ return userMapper.toShortResponse(ent);}

}
