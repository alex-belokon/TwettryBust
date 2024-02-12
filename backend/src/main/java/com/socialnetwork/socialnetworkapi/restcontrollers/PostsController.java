package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.favorite.FavoriteToggleRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.exception.NotImplementedEx;
import com.socialnetwork.socialnetworkapi.service.FavoritesService;
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
    private final FavoritesService favoritesService;

    public PostsController(PostService postService, FavoritesService favoritesService) {
        this.postService = postService;
        this.favoritesService = favoritesService;
    }

    /**
     * Get Endpoints:
     * getAll
     * geyForId
     * getById
     * getLikedBy
     * @return List of PostResponseShort, may return FullDTO (byId)
     */


    @GetMapping("/") public ResponseEntity<List<PostResponseFull>> getAll(){
        List<PostResponseFull> resp = postService.getFullDTOlist();
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
       return favoritesService.toggleFavorite(req)
               ? new ResponseEntity<>(true, HttpStatus.OK)
               : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
   }

}
