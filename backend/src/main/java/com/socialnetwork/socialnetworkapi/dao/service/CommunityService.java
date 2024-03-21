package com.socialnetwork.socialnetworkapi.dao.service;

import com.socialnetwork.socialnetworkapi.dto.community.CommunityCreateRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityResponse;
import com.socialnetwork.socialnetworkapi.dto.community.MembershipRequest;
import com.socialnetwork.socialnetworkapi.dto.community.RoleAssigmentRequest;

import java.util.List;
import java.util.UUID;

public interface CommunityService {
    CommunityResponse createCommunity(CommunityCreateRequest req);

    Boolean deleteCommunity(UUID req, UUID userId);

    CommunityResponse getById(UUID req, UUID currentUserId);

    String getAbout(UUID req);

    List<CommunityResponse> getPaged(CommunityRequest req);

    Boolean toggleMembership(MembershipRequest req);

    Boolean assignRole(RoleAssigmentRequest req);
}
