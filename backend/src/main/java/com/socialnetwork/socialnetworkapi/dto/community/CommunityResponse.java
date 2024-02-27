package com.socialnetwork.socialnetworkapi.dto.community;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class CommunityResponse {
    private UUID id;
    private String name = "";
    private String banner = "";
    private String description = "";
    private String about = "";
    private Integer membersCounts = 0;
}
