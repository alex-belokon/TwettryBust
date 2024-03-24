package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.CommunityRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.service.CommunityService;
import com.socialnetwork.socialnetworkapi.dao.service.NotificationService;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityResponse;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.*;
import com.socialnetwork.socialnetworkapi.enums.NotificationType;
import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import com.socialnetwork.socialnetworkapi.service.DefaultCommunityService;
import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
import com.socialnetwork.socialnetworkapi.service.PostService;
import com.socialnetwork.socialnetworkapi.service.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@RequestMapping("/api/users")
@Tag(name = "Ендпоінти юзерів (не автозгенеровані)")
public class UserController {
    private final DefaultUserService userServ;
    private final UserRepository userRepository;
    private final SubscriptionService subsServ;
    private final PostService postServ;
    private final CommunityService communityService;
    private final NotificationService notificationService;

    public UserController(DefaultUserService userService, SubscriptionService subsServ, PostService postServ, UserRepository userRepository, DefaultCommunityService communityService, NotificationService notificationService) {
        this.userServ = userService;
        this.subsServ = subsServ;
        this.postServ = postServ;
        this.userRepository = userRepository;
        this.communityService = communityService;
        this.notificationService = notificationService;
    }
    private UUID getUserIdByUserDetails(UserDetails userDetails){
        return userRepository.findByUserName(userDetails.getUsername()).map(AbstractEntity::getId).orElse(null);
    }

   @Operation(summary = "Получение всех пользователей")
    @GetMapping("/")
    public ResponseEntity<List<UserResponseShort>> getAllDTO() {
        List<UserResponseShort> resp = userServ.getUsersDTO();
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Получение пользователя по его идентификатору")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseFull> getById(@PathVariable UUID id,  @AuthenticationPrincipal UserDetails userDetails) {
        final UserResponseFull response = userServ.getUserFullDTOById(id, getUserIdByUserDetails(userDetails));

        return response != null ? new ResponseEntity<>(response, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Получение списка пользователей, на которых подписан пользователь с указанным идентификатором")
    @GetMapping("/following/")
    public ResponseEntity<List<UserResponseShort>> getFollowing(@RequestParam UUID userId, @RequestParam Integer page) {
        PageReq req = new PageReq(userId, page);
        List<UserResponseShort> resp = userServ.getFollowingDTO(req);
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Получение списка подписчиков пользователя с указанным идентификатором")
    @GetMapping("/followers/")
    public ResponseEntity<List<UserResponseShort>> getFollowers(@RequestParam UUID userId, @RequestParam Integer page) {
        PageReq req = new PageReq(userId, page);
        List<UserResponseShort> resp = userServ.getFollowersDTO(req);
        return resp != null ? new ResponseEntity<>(resp, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Получение всех постов пользователя по его идентификатору")
    @GetMapping("/posts") public ResponseEntity<List<PostResponseFull>> getPosts(@RequestParam UUID userId, @RequestParam Integer page){
        PageReq req = new PageReq(userId, page);
        List<PostResponseFull> resp = postServ.getByAuthorId(req);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Отримання всіх ком'юніті до яких користувач долучений")
    @GetMapping("/communities") public  ResponseEntity<List<CommunityResponse>> getCommunities(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(required = false) Integer page){
        List <CommunityResponse> resp = communityService.getAllByMemberId(getUserIdByUserDetails(userDetails), page);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @Operation(summary = "Поиск пользователей по запросу")
    @GetMapping("/find/{query}") public ResponseEntity<List<UserResponseFull>> findByCredentials(@PathVariable String query) {
        List<UserResponseFull> resp = userServ.findByCreds(query);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/recommendations") public ResponseEntity<List<UserRecommended>> findRecs(@AuthenticationPrincipal UserDetails userDetails, @RequestParam Integer page){
        PageReq req = new PageReq(getUserIdByUserDetails(userDetails), page);
        List<UserRecommended> resp = userServ.getRecsAtPage(req);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Подписка или отписка от пользователя")
    @PostMapping("/toggleFollow")
    public ResponseEntity<?> toggleFollow(@AuthenticationPrincipal UserDetails userDetails , @RequestParam UUID userId) {
        try {
            boolean result = subsServ.toggleFollow(new FollowRequest(getUserIdByUserDetails(userDetails), userId));

            if (result) notificationService.createAndNotify(userRepository.findById(this.getUserIdByUserDetails(userDetails)), userRepository.findById(userId), NotificationType.USER_SUBSCRIPTION, null);



            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @Operation(summary = "Редактирование данных пользователя по его идентификатору")
    @PutMapping("/edit/") public ResponseEntity<UserResponseFull> editUser(@AuthenticationPrincipal UserDetails userDetails, @RequestBody UserRequest req){
        try {
            UserResponseFull resp = userServ.edit(getUserIdByUserDetails(userDetails), req);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @Operation(summary = "Удаление пользователя по его идентификатору")
    @DeleteMapping("/")
    public ResponseEntity<?> deleteById(@AuthenticationPrincipal UserDetails userDetails ) {
        final boolean result = userServ.deleteUser(getUserIdByUserDetails(userDetails));
        return result
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

}
