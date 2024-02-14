package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dao.repository.SubscriptionRepo;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
public class Facade {
    private final UserMapper userMapper;
    private final PostMapper postMapper;
    private final SubscriptionRepo repository;

    public Facade (UserMapper userMapper, PostMapper postMapper, SubscriptionRepo repo) {
        this.userMapper = userMapper;
        this.postMapper = postMapper;
        this.repository = repo;
    }
    /**
    *Mapping user model
     **/
    public UserResponseFull userToFullDTO(User ent){
        return userMapper.toFullResponse(ent);
    }
    public UserResponseShort userToShortDTO(User ent, UUID following){
        UserResponseShort resp = userMapper.toShortResponse(ent);
        resp.setFollowing(Objects.nonNull(repository.getSubscriptionByFollowingIdAndFollowerId(ent.getId(), following)));
        return resp;
    }
    public User userFromDTO(UserRequest req){
        return userMapper.toEntity(req);
    }

    /**
     *Mapping post model
     */
    public PostResponseFull postToFullDTO(Post ent){
        return postMapper.toResponseFull(ent);
    }
    public Post postFromDTO(PostRequest req){
        return postMapper.toEntity(req);
    }


}
