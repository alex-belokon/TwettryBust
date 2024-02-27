package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.community.CommunityResponse;
import com.socialnetwork.socialnetworkapi.exception.NotImplementedEx;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
