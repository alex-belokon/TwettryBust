package com.socialnetwork.socialnetworkapi.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;
@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class PageReq {
    private UUID     userId;
    private Integer  page;

    public Integer getPage() {
        if(page == null) page = 1;
        return page;
    }
}
