package com.socialnetwork.socialnetworkapi.dto.community;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor
public class CommunityPostsRequest {
    private UUID currentUserId;
    private UUID communityId;
    private Integer page;
    private Integer pageSize;
    public CommunityPostsRequest(UUID cid, UUID uid, Integer page, Integer pageSize){
        this.communityId = cid;
        this.currentUserId = uid;
        this.page = page;
        this.pageSize = pageSize;
    }
}
