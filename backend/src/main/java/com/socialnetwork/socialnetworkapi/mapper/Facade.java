package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dto.User.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.User.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.User.UserResponseShort;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Facade {
    @Autowired UserMapper userMapper;

    public User userFromDTO(UserRequest req) {
        return userMapper.toEntity(req);
    }
    public UserResponseFull userToFullDTO(User ent){
        return userMapper.toFullResponse(ent);
    }
    public UserResponseShort userToShortDTO(User ent){ return userMapper.toShortResponse(ent);}

}
