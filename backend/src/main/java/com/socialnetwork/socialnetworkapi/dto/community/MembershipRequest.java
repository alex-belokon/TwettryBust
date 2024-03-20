package com.socialnetwork.socialnetworkapi.dto.community;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@NoArgsConstructor
@Setter @Getter
public class MembershipRequest {
    private UUID userId;
    private UUID communityId;

    public MembershipRequest(UUID userId, UUID communityId) {
        this.userId = userId;
        this.communityId = communityId;
    }
}
