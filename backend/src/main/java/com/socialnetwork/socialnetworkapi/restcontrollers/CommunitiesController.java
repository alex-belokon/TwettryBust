package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.community.*;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.exception.NotImplementedEx;
import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import com.socialnetwork.socialnetworkapi.service.DefaultCommunityService;
import com.socialnetwork.socialnetworkapi.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping(path = "/api/communities")
public class CommunitiesController {

    final PostService postService;
    final DefaultCommunityService communityService;

    final UserRepository userRepository;

    private UUID getUserIdByUserDetails(UserDetails userDetails) {
        return userRepository.findByUserName(userDetails.getUsername()).map(AbstractEntity::getId).orElse(null);
    }

    public CommunitiesController(PostService postService, DefaultCommunityService communityService, UserRepository userRepo) {
        this.postService = postService;
        this.communityService = communityService;
        this.userRepository = userRepo;
    }

    @GetMapping("/")
    public ResponseEntity<List<CommunityResponse>> getAll(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer pageSize) {
        CommunityRequest req = new CommunityRequest();
        req.setPage(page);
        req.setPageSize(pageSize);
        List<CommunityResponse> data = communityService.getPaged(req);
        return data == null ?
                new ResponseEntity<>(HttpStatus.BAD_REQUEST) :
                new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunityResponse> getByID(@PathVariable UUID id) {
        CommunityResponse data = communityService.getById(id);
        return data == null ?
                new ResponseEntity<>(HttpStatus.BAD_REQUEST) :
                new ResponseEntity<>(data, HttpStatus.OK);

    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<List<PostResponseFull>> getCommunityPostsPaged(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer pageSize, @AuthenticationPrincipal UserDetails userDetails, @PathVariable UUID id) {
        CommunityPostsRequest request = new CommunityPostsRequest(id, getUserIdByUserDetails(userDetails), page, pageSize);
        List<PostResponseFull> data = postService.getCommunityPostsPaged(request);
        return data == null ?
                new ResponseEntity<>(HttpStatus.BAD_REQUEST) :
                new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<CommunityResponse> createCommunity(@RequestBody CommunityCreateRequest req, @AuthenticationPrincipal UserDetails userDetails) {
        req.setCreatorId(getUserIdByUserDetails(userDetails));
        CommunityResponse resp = communityService.createCommunity(req);
        return resp == null ?
                new ResponseEntity<>(HttpStatus.BAD_REQUEST) :
                new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @PostMapping("/toggle_participants")
    public ResponseEntity<Boolean> toggleParticipants(@RequestParam UUID communityId, @AuthenticationPrincipal UserDetails userDetails) {
        MembershipRequest req = new MembershipRequest(getUserIdByUserDetails(userDetails), communityId);
        try {
            Boolean resp = communityService.toggleMembership(req);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/assign_role")
    public ResponseEntity<Boolean> assignRole(@RequestBody RoleAssigmentRequest req, @AuthenticationPrincipal UserDetails userDetails) {
        req.setAdminId(getUserIdByUserDetails(userDetails));
        try {
            Boolean resp = communityService.assignRole(req);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> deleteCommunity(@RequestParam UUID communityId, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Boolean resp = communityService.deleteCommunity(communityId, getUserIdByUserDetails(userDetails));
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
