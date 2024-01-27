package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.UserService;
import com.socialnetwork.socialnetworkapi.dto.User.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.User.UserResponseShort;
import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController @Slf4j
@RequestMapping("/api/users")
@Tag(name = "UserController")
public class UserController {
    private DefaultUserService userServ;

    public UserController(DefaultUserService userService) {
        this.userServ = userService;
    }

    @GetMapping("") public  ResponseEntity<List<UserResponseShort>>  getAll (){
        final List<UserResponseShort> response = userServ.getUsersShortDTO();

        return response != null && !response.isEmpty()
                ? new ResponseEntity<>(response, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping(   "/{id}") public ResponseEntity<UserResponseFull> getById (@PathVariable UUID id){
        final UserResponseFull response =  userServ.getUserDTOById(id);

        return response != null ? new ResponseEntity<>(response, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
