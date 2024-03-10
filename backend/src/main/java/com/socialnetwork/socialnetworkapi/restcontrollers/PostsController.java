package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.PostRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.favAndLikes.FavoriteToggleRequest;
import com.socialnetwork.socialnetworkapi.dto.favAndLikes.LikeRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.PageReq;
import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.service.FavsAndLikesService;
import com.socialnetwork.socialnetworkapi.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping(path = "/api/posts")
@Tag(name = "Ендпоінти постів (не автозгенеровані)")
public class PostsController {
    private final PostService postService;
    private final PostRepository postRepository;
    private final FavsAndLikesService favsAndLikesService;
    private final UserRepository userRepository;

    private UUID getUserIdByUserDetails(UserDetails userDetails){
        return userRepository.findByUserName(userDetails.getUsername()).map(AbstractEntity::getId).orElse(null);
    }

    public PostsController(PostService postService, PostRepository postRepository, FavsAndLikesService favsAndLikesService, UserRepository userRepo) {
        this.postService = postService;
        this.postRepository = postRepository;
        this.favsAndLikesService = favsAndLikesService;
        this.userRepository = userRepo;
    }

    @Operation(summary = "Получение всех постов")
    @GetMapping("/")
    public ResponseEntity<List<PostResponseFull>> getAll(@AuthenticationPrincipal UserDetails userDetails, @RequestParam Integer page) {
        PageReq req = new PageReq(getUserIdByUserDetails(userDetails), page);
        List<PostResponseFull> resp = postService.getFullDTOlist(req);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Получение поста по его идентификатору")
    @GetMapping("/{id}")
    public ResponseEntity<PostResponseFull> getById(@PathVariable UUID id, @AuthenticationPrincipal UserDetails userDetails) {
        PostResponseFull resp = postService.getById(id, getUserIdByUserDetails(userDetails));
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @Operation(summary = "Получение списка постов, которые понравились пользователю с указанным идентификатором")
    @GetMapping("/likedBy")
    public ResponseEntity<List<PostResponseFull>> getLikedBy(@AuthenticationPrincipal UserDetails userDetails, @RequestParam Integer page) {
        PageReq req = new PageReq(getUserIdByUserDetails(userDetails), page);
        List<PostResponseFull> resp = postService.getLikedBy(req);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Получение списка постов, которые добавлены в избранное пользователем с указанным идентификатором")
    @GetMapping("/favoredBy")
    public ResponseEntity<List<PostResponseFull>> getFavoredBy(@AuthenticationPrincipal UserDetails userDetails, @RequestParam Integer page) {
        PageReq req = new PageReq(getUserIdByUserDetails(userDetails), page);
        List<PostResponseFull> resp = postService.getFavoredBy(req);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/followedUsersPosts")
    public ResponseEntity<List<PostResponseFull>> getFollowedUsersPosts(@AuthenticationPrincipal UserDetails userDetails, @RequestParam Integer page) {
        PageReq req = new PageReq(getUserIdByUserDetails(userDetails), page);
        List<PostResponseFull> resp = postService.getFollowedUsersPosts(req);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Post Endpoints: save edit
     *
     * @return Post Response full
     */
    @Operation(summary = "Создание нового поста")
    @PostMapping("/")
    public ResponseEntity<PostResponseFull> save(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PostRequest request) {
        PostResponseFull resp = postService.save(getUserIdByUserDetails(userDetails), request);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "Переключение статуса понравившегося для поста")
    @PostMapping("/favorite")
    public ResponseEntity<Boolean> toggleFavorite(@AuthenticationPrincipal UserDetails userDetails,UUID postId) {
        return favsAndLikesService.toggleFavorite(new FavoriteToggleRequest(getUserIdByUserDetails(userDetails), postId))
                ? new ResponseEntity<>(true, HttpStatus.OK)
                : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "Переключение статуса лайка для поста")
    @PostMapping("/like")
    public ResponseEntity<Boolean> toggleLike(@AuthenticationPrincipal UserDetails userDetails,UUID postId) {
        return favsAndLikesService.toggleLike(new LikeRequest(getUserIdByUserDetails(userDetails), postId))
                ? new ResponseEntity<>(true, HttpStatus.OK)
                : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "Редактирование поста по его идентификатору")
    @PutMapping("/edit/{id}")
    public ResponseEntity<PostResponseFull> editPost(@AuthenticationPrincipal UserDetails userDetails, @PathVariable UUID id, @RequestBody PostRequest req) {
        try {
            PostResponseFull resp = postService.edit(getUserIdByUserDetails(userDetails), id, req);
            if (resp == null) throw new Exception("Invalid ID");
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "Удаление поста по его идентификатору")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@AuthenticationPrincipal UserDetails userDetails, @PathVariable(name = "id") UUID id) {
        final boolean result = postService.deletePost(getUserIdByUserDetails(userDetails) ,id);
        return result
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @Operation(summary = "Зберегти лайк на пості")
    @PostMapping
    public ResponseEntity<?> saveLikeOnPost(@RequestParam("postId") UUID postId, @RequestParam("userId") UUID userId) {
        try {
            Optional<Post> postOptional = postRepository.findById(postId);
            if (postOptional.isPresent()) {
                Post post = postOptional.get();
                postService.saveLikedPost(post.getId(), userId);
                return ResponseEntity.status(HttpStatus.CREATED).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save like on post: " + e.getMessage());
        }
    }
}
