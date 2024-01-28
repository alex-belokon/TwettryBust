package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dao.SubscriptionRepo;
import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.user.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
public class Facade {
    private final UserMapper userMapper;
    private final SubscriptionRepo repository;

    public Facade (UserMapper userMapper, SubscriptionRepo repo) {
        this.userMapper = userMapper;
        this.repository = repo;
    }
    public User userFromDTO(UserRequest req) {
        return userMapper.toEntity(req);
    }
    public UserResponseFull userToFullDTO(User ent){
        return userMapper.toFullResponse(ent);
    }
    public UserResponseShort userToShortDTO(User ent, UUID following){
        UserResponseShort resp = userMapper.toShortResponse(ent);
        resp.setFollowing(Objects.nonNull(repository.getSubscriptionByFollowingIdAndFollowerId(ent.getId(), following)));
        return resp;
    }

}
