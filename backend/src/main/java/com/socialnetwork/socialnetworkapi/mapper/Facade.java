package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dao.repository.SubscriptionRepository;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityCreateRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityResponse;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityResponseFull;
import com.socialnetwork.socialnetworkapi.dto.community.MembershipRequest;
import com.socialnetwork.socialnetworkapi.dto.post.AuthorDTO;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseShort;
import com.socialnetwork.socialnetworkapi.dto.user.UserRecommended;
import com.socialnetwork.socialnetworkapi.dto.user.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.communities.Community;
import com.socialnetwork.socialnetworkapi.model.communities.CommunityMember;
import org.springframework.stereotype.Service;

@Service
public class Facade {
    private final UserMapper userMapper;
    private final PostMapper postMapper;
    private final CommunitiesMapper communitiesMapper;


    public Facade(UserMapper userMapper, PostMapper postMapper, SubscriptionRepository repo, CommunitiesMapper communitiesMapper) {
        this.userMapper = userMapper;
        this.postMapper = postMapper;
        this.communitiesMapper = communitiesMapper;
    }

    /**
     * Mapping user model
     **/
    public UserResponseFull userToFullDTO(User ent) {
        return userMapper.toFullResponse(ent);
    }
    public UserRecommended toRecsDTO(User ent) {
        return userMapper.toRecsResponse(ent);
    }

    public UserResponseShort userToShortDTO(User ent) {
        return userMapper.toShortResponse(ent);
    }

    public User userFromDTO(UserRequest req) {
        return userMapper.toEntity(req);
    }

    public AuthorDTO toAuthor(User data) {
        return userMapper.toPostAuthor(data);
    }

    /**
     * Mapping post model
     */
    public PostResponseFull postToFullDTO(Post ent) {
        return postMapper.toResponseFull(ent);
    }

    public Post postFromDTO(PostRequest req) {
        return postMapper.toEntity(req);
    }

    public PostResponseShort postToShortDTO(Post ent) {
        return postMapper.toResponseShort(ent);
    }

    public CommunityResponse communityToDTO(Community ent){
        return communitiesMapper.communityToDTO(ent);
    }
    public CommunityResponseFull communityToFullDTO(Community ent){ return communitiesMapper.communityFullToDTO(ent);}
    public Community communityFromDTO(CommunityCreateRequest req) {
        return communitiesMapper.communityFromDTO(req);
    }
    public CommunityMember communityMemberFromDTO(MembershipRequest req){
        return communitiesMapper.communityMemberFromDTO(req);
    }

}
