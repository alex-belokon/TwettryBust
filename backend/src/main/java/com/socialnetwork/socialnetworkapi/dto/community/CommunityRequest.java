package com.socialnetwork.socialnetworkapi.dto.community;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor @NoArgsConstructor
@Setter @Getter
public class CommunityRequest {
    private Integer page;
    private Integer pageSize;
    private UUID userId;
}
