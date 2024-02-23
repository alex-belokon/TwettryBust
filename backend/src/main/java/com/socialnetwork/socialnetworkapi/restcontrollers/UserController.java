package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.*;
import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
import com.socialnetwork.socialnetworkapi.service.PostService;
import com.socialnetwork.socialnetworkapi.service.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
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


   @Operation(summary = "Получение всех пользователей")
    @GetMapping("/")
    public ResponseEntity<List<UserResponseShort>> getAllDTO() {
        List<UserResponseShort> resp = userServ.getUsersDTO();
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Получение пользователя по его идентификатору")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseFull> getById(@PathVariable UUID id) {
        final UserResponseFull response = userServ.getUserFullDTOById(id);

        return response != null ? new ResponseEntity<>(response, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Получение списка пользователей, на которых подписан пользователь с указанным идентификатором")
    @GetMapping("/following/{id}")
    public ResponseEntity<List<UserResponseShort>> getFollowing(@PathVariable UUID id, @RequestParam Integer page) {
        PageReq req = new PageReq(id, page);
        List<UserResponseShort> resp = userServ.getFollowingDTO(req);
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Получение списка подписчиков пользователя с указанным идентификатором")
    @GetMapping("/follower/{id}")
    public ResponseEntity<List<UserResponseShort>> getFollowers(@PathVariable UUID id, @RequestParam Integer page) {
        PageReq req = new PageReq(id, page);
        List<UserResponseShort> resp = userServ.getFollowersDTO(req);
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Получение всех постов пользователя по его идентификатору")
    @GetMapping("/{id}/posts") public ResponseEntity<List<PostResponseFull>> getPosts(@PathVariable UUID id, @RequestParam Integer page){
        PageReq req = new PageReq(id, page);
        List<PostResponseFull> resp = postServ.getByAuthorId(req);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Поиск пользователей по запросу")
    @GetMapping("/find/{query}") public ResponseEntity<List<UserResponseFull>> findByCreds(@PathVariable String query) {
        List<UserResponseFull> resp = userServ.findByCreds(query);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/recommendations") public ResponseEntity<List<UserRecommended>> findRecs(@RequestParam UUID uid, @RequestParam Integer page){
        PageReq req = new PageReq(uid, page);
        List<UserRecommended> resp = userServ.getRecsAtPage(req);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Подписка или отписка от пользователя")
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
    @Operation(summary = "Редактирование данных пользователя по его идентификатору")
    @PutMapping("/edit/{id}") public ResponseEntity<UserResponseFull> editUser(@PathVariable UUID id, @RequestBody UserRequest req){
        try {
            UserResponseFull resp = userServ.edit(id, req);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @Operation(summary = "Удаление пользователя по его идентификатору")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable(name = "id") UUID id) {
        final boolean result = userServ.deleteUser(id);
        return result
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

}
