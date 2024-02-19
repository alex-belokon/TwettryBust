package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.favAndLikes.FavoriteToggleRequest;
import com.socialnetwork.socialnetworkapi.dto.favAndLikes.LikeRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.PageReq;
import com.socialnetwork.socialnetworkapi.service.FavsAndLikesService;
import com.socialnetwork.socialnetworkapi.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController @Slf4j
@RequestMapping(path = "/api/posts")
public class PostsController {
    private final PostService postService;
    private final FavsAndLikesService favsAndLikesService;

    public PostsController(PostService postService, FavsAndLikesService favsAndLikesService) {
        this.postService = postService;
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


    @GetMapping("/") public ResponseEntity<List<PostResponseFull>> getAll(@RequestParam UUID uid, @RequestParam Integer page){
        PageReq req = new PageReq(uid, page);
        List<PostResponseFull> resp = postService.getFullDTOlist(req);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/{id}") public ResponseEntity<PostResponseFull> getById(@PathVariable UUID id){
        PostResponseFull resp = postService.getById(id);
        return resp!= null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
    @GetMapping("/likedBy/{id}") public ResponseEntity<List<PostResponseFull>> getLikedBy(@PathVariable UUID id){
        List<PostResponseFull> resp = postService.getLikedBy(id);
        return resp!= null
               ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
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

   @PostMapping("/") public ResponseEntity<PostResponseFull> save(@RequestBody PostRequest request) {
       PostResponseFull resp = postService.save(request);
       return resp != null
               ? new ResponseEntity<>(resp, HttpStatus.OK)
               : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
   }

   @PostMapping("/favorite") public ResponseEntity<Boolean> toggleFavorite(@RequestBody FavoriteToggleRequest req){
       return favsAndLikesService.toggleFavorite(req)
               ? new ResponseEntity<>(true, HttpStatus.OK)
               : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
   }
   @PostMapping("/like") public ResponseEntity<Boolean> toggleLike(@RequestBody LikeRequest req){
       return favsAndLikesService.toggleLike(req)
             ? new ResponseEntity<>(true, HttpStatus.OK)
               : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
   }
    @PutMapping("/edit/{id}") public ResponseEntity<PostResponseFull> editUser(@PathVariable UUID id, @RequestBody PostRequest req){
        try {
            PostResponseFull resp = postService.edit(id, req);
            if (resp == null) throw new Exception("Invalid ID");
            return new ResponseEntity<>(resp, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable(name = "id") UUID id) {
        final boolean result = postService.deleteUser(id);
        return result
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

}
