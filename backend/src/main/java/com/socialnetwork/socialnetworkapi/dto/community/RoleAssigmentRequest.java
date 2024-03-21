package com.socialnetwork.socialnetworkapi.dto.community;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter @Getter
public class RoleAssigmentRequest {
    private UUID memberId;
    private UUID communityId;
    private UUID adminId;
    public RoleAssigmentRequest (UUID memberId, UUID communityId, UUID adminId){
        this.memberId = memberId;
        this.communityId = communityId;
        this.adminId = adminId;
    }
}
