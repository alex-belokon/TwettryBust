package com.socialnetwork.socialnetworkapi.dao.service;

import com.socialnetwork.socialnetworkapi.dto.community.*;

import java.util.List;
import java.util.UUID;

public interface CommunityService {
    CommunityResponse createCommunity(CommunityCreateRequest req);

    Boolean deleteCommunity(UUID req, UUID userId);

    CommunityResponse getById(UUID req, UUID currentUserId);

    String getAbout(UUID req);

    List<CommunityResponseFull> getPaged(CommunityRequest req);

    Boolean toggleMembership(MembershipRequest req);

    Boolean assignRole(RoleAssigmentRequest req);

    List<CommunityResponse> getAllByMemberId(UUID req, Integer page);
}
