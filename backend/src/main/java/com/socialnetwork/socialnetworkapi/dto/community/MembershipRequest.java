package com.socialnetwork.socialnetworkapi.dto.community;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter
public class MembershipRequest {
    private UUID userId;
    private UUID communityId;
}
