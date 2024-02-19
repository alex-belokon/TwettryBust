package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.*;
import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
import com.socialnetwork.socialnetworkapi.service.PostService;
import com.socialnetwork.socialnetworkapi.service.SubscriptionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/api/users")
@Tag(name = "UserController")
public class UserController {
    private final DefaultUserService userServ;
    private final SubscriptionService subsServ;
    private final PostService postServ;

    public UserController(DefaultUserService userService, SubscriptionService subsServ, PostService postServ) {
        this.userServ = userService;
        this.subsServ = subsServ;
        this.postServ = postServ;
    }

    /**
     * http://localhost:9000/api/users/{id}
     *
     * @param id
     * @return User full DTO
     */


    @GetMapping("/")
    public ResponseEntity<List<UserResponseShort>> getAllDTO() {
        List<UserResponseShort> resp = userServ.getUsersDTO();
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseFull> getById(@PathVariable UUID id) {
        final UserResponseFull response = userServ.getUserFullDTOById(id);

        return response != null ? new ResponseEntity<>(response, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/following/{id}")
    public ResponseEntity<List<UserResponseShort>> getFollowing(@PathVariable UUID id) {
        List<UserResponseShort> resp = userServ.getFollowingDTO(id);
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/follower/{id}")
    public ResponseEntity<List<UserResponseShort>> getFollowers(@PathVariable UUID id) {
        List<UserResponseShort> resp = userServ.getFollowersDTO(id);
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/{id}/posts") public ResponseEntity<List<PostResponseFull>> getPosts(@PathVariable UUID id){
        List<PostResponseFull> resp = postServ.getByAuthorId(id);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/find/{query}") public ResponseEntity<List<UserResponseFull>> findByCreds(@PathVariable String query) {
        List<UserResponseFull> resp = userServ.findByCreds(query);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/recommendations") public ResponseEntity<List<UserResponseFull>> findRecs(@RequestParam UUID uid, @RequestParam Integer page){
        PageReq req = new PageReq(uid, page);
        List<UserResponseFull> resp = userServ.getRecsAtPage(req);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/toggleFollow")
    public ResponseEntity<?> toggleFollow(@RequestBody FollowRequest req) {
        System.out.println(req);
        try {
            boolean result = subsServ.toggleFollow(req);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/edit/{id}") public ResponseEntity<UserResponseFull> editUser(@PathVariable UUID id, @RequestBody UserRequest req){
        try {
            UserResponseFull resp = userServ.edit(id, req);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable(name = "id") UUID id) {
        final boolean result = userServ.deleteUser(id);
        return result
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

}
