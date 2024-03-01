package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dto.community.CommunityCreateRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityResponse;
import com.socialnetwork.socialnetworkapi.dto.community.MembershipRequest;
import com.socialnetwork.socialnetworkapi.model.communities.Community;
import com.socialnetwork.socialnetworkapi.model.communities.CommunityMember;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class CommunitiesMapper {
    private final ModelMapper modelMapper;

    public CommunitiesMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CommunityResponse communityToDTO(Community entity){
        return Objects.isNull(entity)? null : modelMapper.map(entity , CommunityResponse.class);
    }
    public Community communityFromDTO(CommunityCreateRequest dto){
        return Objects.isNull(dto)? null : modelMapper.map(dto, Community.class);
    }
    public CommunityMember communityMemberFromDTO(MembershipRequest req){
        return Objects.isNull(req)? null : modelMapper.map(req, CommunityMember.class);
    }
}
