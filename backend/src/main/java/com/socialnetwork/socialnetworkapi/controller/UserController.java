package com.socialnetwork.socialnetworkapi.controller;

import com.socialnetwork.socialnetworkapi.dto.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.UserResponse;
import com.socialnetwork.socialnetworkapi.exception.NotImplementedEx;
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

    @GetMapping("")         public  List<UserResponse> getAll    (){
        log.info("GET USERS {ALL}");
        return userServ.getUsers();
    }
    @GetMapping(   "/{id}") public  UserResponse       getById   (@PathVariable UUID id){
        return userServ.getUserByID(id);
    }
    @PostMapping("create")  public  UserResponse       createUser(@RequestBody UserRequest req){
        return userServ.createUser(req);
    }

}
//        userData = {
//               banner: bannerUrl,
//               userScreensaver: "https://sitis.com.ua/upload/medialibrary/121/Programmist_1c.jpg",
//               name: "Name",
//               lastName: "User",
//               bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae totam sint, voluptatibus corporis quos debitis eaque cupiditate molestiae. Assumenda, ut.",
//               login: "@userName3333",
//               joiningDate: new Date,
//               location: "Ukraine",
//               birthDate: "22.10.13",
//               following: 2,
//               followers: 5,
//        };