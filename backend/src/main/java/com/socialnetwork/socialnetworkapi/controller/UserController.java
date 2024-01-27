package com.socialnetwork.socialnetworkapi.controller;

import com.socialnetwork.socialnetworkapi.dto.User.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.User.UserResponseShort;
import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController @Slf4j
@RequestMapping("user")
public class UserController {
    @Autowired
    DefaultUserService userServ;

    @GetMapping("/all")         public  List<UserResponseShort> getAll    (){
        log.info("GET USERS {ALL}");
        return userServ.getUsersShortDTO();
    }
    @GetMapping(   "/{id}") public UserResponseFull getById   (@PathVariable UUID id){
        log.info("GET USER WITH ID " + id);
        return userServ.getUserDTOById(id);
    }

}
