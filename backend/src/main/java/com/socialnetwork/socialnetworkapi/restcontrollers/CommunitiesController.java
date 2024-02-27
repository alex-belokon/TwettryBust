package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.community.*;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.exception.NotImplementedEx;
import com.socialnetwork.socialnetworkapi.service.DefaultCommunityService;
import com.socialnetwork.socialnetworkapi.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping(path = "/api/communities")
public class CommunitiesController {

    final PostService postService;
    final DefaultCommunityService communityService;

    public CommunitiesController(PostService postService, DefaultCommunityService communityService){
        this.postService = postService;
        this.communityService = communityService;
    }
    @GetMapping("/") public ResponseEntity<List<CommunityResponse>> getAll(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer pageSize){
        CommunityRequest req = new CommunityRequest();
        req.setPage(page);
        req.setPageSize(pageSize);
        List<CommunityResponse> data = communityService.getPaged(req);
        return data == null ?
                new ResponseEntity<>(HttpStatus.BAD_REQUEST) :
                new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping("/{id}") public ResponseEntity<CommunityResponse> getByID(@RequestParam UUID id){
        CommunityResponse data = communityService.getById(id);
        return data == null ?
                new ResponseEntity<>(HttpStatus.BAD_REQUEST) :
                new ResponseEntity<>(data, HttpStatus.OK);

    }
    @GetMapping("/{id}/posts") public ResponseEntity<List<PostResponseFull>> getCommunityPostsPaged (@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer pageSize, @RequestParam UUID currentUserId, @PathVariable UUID id){
        CommunityPostsRequest request = new CommunityPostsRequest(id, currentUserId, page, pageSize);
        List<PostResponseFull> data = postService.getCommunityPostsPaged(request);
        return data == null ?
                new ResponseEntity<>(HttpStatus.BAD_REQUEST) :
                new ResponseEntity<>(data, HttpStatus.OK);
    }
    @PostMapping("/create") public ResponseEntity<CommunityResponse> createCommunity(@RequestBody CommunityCreateRequest req){
        CommunityResponse resp = communityService.createCommunity(req);
        return resp == null ?
                new ResponseEntity<>(HttpStatus.BAD_REQUEST) :
                new ResponseEntity<>(resp, HttpStatus.OK);
    }
    @PostMapping("/toggle_participants") public ResponseEntity<Boolean> toggleParticipants(@RequestBody MembershipRequest req){
        try {
            Boolean resp = communityService.toggleMembership(req);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        }catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
