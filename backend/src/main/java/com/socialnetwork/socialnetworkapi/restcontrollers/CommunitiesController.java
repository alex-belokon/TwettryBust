package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.community.CommunityPostsRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityResponse;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.exception.NotImplementedEx;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping(path = "/api/communities")
public class CommunitiesController {
    // services

    public CommunitiesController(){

    }
    @GetMapping("/") public ResponseEntity<List<CommunityResponse>> getAll(@RequestParam Integer page, @RequestParam Integer pageSize){
        throw new NotImplementedEx("");
    }
    @GetMapping("/{id}/posts") public ResponseEntity<List<PostResponseFull>> getCommunityPost (@RequestParam Integer page, @RequestParam Integer pageSize, @RequestParam UUID currentUserId, @PathVariable UUID id){
        CommunityPostsRequest request = new CommunityPostsRequest(id, currentUserId, page, pageSize);

        throw new NotImplementedEx("");
    }
}
