package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.user.FollowRequest;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
import com.socialnetwork.socialnetworkapi.service.SubscriptionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController @Slf4j
@RequestMapping("/api/users")
@Tag(name = "UserController")
public class UserController {
    private final DefaultUserService  userServ;
    private final SubscriptionService subsServ;

    public UserController(DefaultUserService userService, SubscriptionService subsServ) {
        this.userServ = userService;
        this.subsServ = subsServ;
    }


    @GetMapping(   "/{id}")        public ResponseEntity<UserResponseFull>         getById    (@PathVariable UUID id){
        final UserResponseFull response =  userServ.getUserFullDTOById(id);

        return response != null ? new ResponseEntity<>(response, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
//    @GetMapping("/{id}/connections") public  ResponseEntity<List<UserResponseShort>>  getAll (@PathVariable UUID id){
//        final List<UserResponseShort> response = userServ.getUsersShortDTOList(id);
//
//        return response != null && !response.isEmpty()
//                ? new ResponseEntity<>(response, HttpStatus.OK)
//                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
    @DeleteMapping("/{id}")        public ResponseEntity<?>                        deleteById (@PathVariable(name = "id") UUID id){
        final boolean result = userServ.deleteUser(id);
        return result
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @GetMapping("/")               public ResponseEntity<List<UserResponseShort>>  getByCreds (@RequestParam String findBy){
        System.out.println("find user by "+ findBy+ " creds");
        return new ResponseEntity<>(HttpStatus.OK);
    } //not implemented

    @GetMapping("/")               public ResponseEntity<List<UserResponseShort>>  getAllDTO(){
        final List<UserResponseShort> resp = userServ.getUsersDTO();
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/following/{id}") public ResponseEntity<List<UserResponseShort>>  getFollowing(@PathVariable UUID id){
        List<UserResponseShort> resp = userServ.getFollowingDTO(id);
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/follower/{id}")  public ResponseEntity<List<UserResponseShort>>  getFollowers(@PathVariable UUID id){
        List<UserResponseShort> resp = userServ.getFollowersDTO(id);
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/toggleFollow")  public ResponseEntity<?> toggleFollow(@RequestBody FollowRequest req){
        try{
            boolean result = subsServ.toggleFollow(req);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
