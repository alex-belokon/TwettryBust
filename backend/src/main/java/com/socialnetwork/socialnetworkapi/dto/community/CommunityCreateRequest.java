package com.socialnetwork.socialnetworkapi.dto.community;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class CommunityCreateRequest {
    private String name;
    private UUID creatorId;
    private String about;
    private String description;
    private String banner;
}
