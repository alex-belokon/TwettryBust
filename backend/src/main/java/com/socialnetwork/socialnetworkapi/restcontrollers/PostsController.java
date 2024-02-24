package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.PostRepository;
import com.socialnetwork.socialnetworkapi.dto.favAndLikes.FavoriteToggleRequest;
import com.socialnetwork.socialnetworkapi.dto.favAndLikes.LikeRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.PageReq;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.service.FavsAndLikesService;
import com.socialnetwork.socialnetworkapi.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController @Slf4j
@RequestMapping(path = "/api/posts")
public class PostsController {
    private final PostService postService;
    private final PostRepository postRepository;
    private final FavsAndLikesService favsAndLikesService;

    public PostsController(PostService postService, PostRepository postRepository, FavsAndLikesService favsAndLikesService) {
        this.postService = postService;
        this.postRepository = postRepository;
        this.favsAndLikesService = favsAndLikesService;
    }

    /**
     * Get Endpoints:
     * getAll
     * geyForId
     * getById
     * getLikedBy
     * @return List of PostResponseShort, may return FullDTO (byId)
     */

    @Operation(summary = "Получение всех постов")
    @GetMapping("/") public ResponseEntity<List<PostResponseFull>> getAll(@RequestParam UUID uid, @RequestParam Integer page){
        PageReq req = new PageReq(uid, page);
        List<PostResponseFull> resp = postService.getFullDTOlist(req);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Получение поста по его идентификатору")
    @GetMapping("/{id}") public ResponseEntity<PostResponseFull> getById(@PathVariable UUID id){
        PostResponseFull resp = postService.getById(id);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @Operation(summary = "Получение списка постов, которые понравились пользователю с указанным идентификатором")
    @GetMapping("/likedBy/{id}") public ResponseEntity<List<PostResponseFull>> getLikedBy(@PathVariable UUID id){
        List<PostResponseFull> resp = postService.getLikedBy(id);
        return resp!= null
               ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "Получение списка постов, которые добавлены в избранное пользователем с указанным идентификатором")
    @GetMapping("/favoredBy/{id}") public ResponseEntity<List<PostResponseFull>> getFavoredBy(@PathVariable UUID id){
        List<PostResponseFull> resp = postService.getFavoredBy(id);
        return resp!= null
              ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/followedUsersPosts") public ResponseEntity<List<PostResponseFull>> getFollowedUsersPosts(@RequestParam UUID uid, @RequestParam Integer page){
        PageReq req = new PageReq(uid, page);
        List<PostResponseFull> resp = postService.getFollowedUsersPosts(req);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Post Endpoints: save edit
     * @return Post Response full
     */
    @Operation(summary = "Создание нового поста")
   @PostMapping("/") public ResponseEntity<PostResponseFull> save(@RequestBody PostRequest request) {
       PostResponseFull resp = postService.save(request);
       return resp != null
               ? new ResponseEntity<>(resp, HttpStatus.OK)
               : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
   }

    @Operation(summary = "Переключение статуса понравившегося для поста")
    @PostMapping("/favorite") public ResponseEntity<Boolean> toggleFavorite(@RequestBody FavoriteToggleRequest req){
       return favsAndLikesService.toggleFavorite(req)
               ? new ResponseEntity<>(true, HttpStatus.OK)
               : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
   }
    @Operation(summary = "Переключение статуса лайка для поста")
    @PostMapping("/like") public ResponseEntity<Boolean> toggleLike(@RequestBody LikeRequest req){
       return favsAndLikesService.toggleLike(req)
             ? new ResponseEntity<>(true, HttpStatus.OK)
               : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
   }
    @Operation(summary = "Редактирование поста по его идентификатору")
    @PutMapping("/edit/{id}") public ResponseEntity<PostResponseFull> editUser(@PathVariable UUID id, @RequestBody PostRequest req){
        try {
            PostResponseFull resp = postService.edit(id, req);
            if (resp == null) throw new Exception("Invalid ID");
            return new ResponseEntity<>(resp, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @Operation(summary = "Удаление поста по его идентификатору")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable(name = "id") UUID id) {
        final boolean result = postService.deleteUser(id);
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
