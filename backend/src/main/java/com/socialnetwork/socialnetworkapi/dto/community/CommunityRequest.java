package com.socialnetwork.socialnetworkapi.dto.community;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor @NoArgsConstructor
@Setter @Getter
public class CommunityRequest {
    private Integer page = 0;
    private Integer pageSize = 5;
    private UUID userId;
}
