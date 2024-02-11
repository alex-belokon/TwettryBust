package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.post.PostRequest;
import com.socialnetwork.socialnetworkapi.dto.post.PostResponseFull;
import com.socialnetwork.socialnetworkapi.exception.NotImplementedEx;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.service.PostService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController @Slf4j
@RequestMapping("/api/posts")
@Tag(name = "PostController")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
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
    @GetMapping("/") public ResponseEntity<List<PostResponseFull>> getForId(@RequestParam String forUser ){
        List<PostResponseFull> resp;
        throw  new NotImplementedEx("");
    }
    /**
     * Post Endpoints: save edit
     * @return Post Response full
     */

    @PostMapping("/") public ResponseEntity<PostResponseFull> save(@RequestBody PostRequest request){
        PostResponseFull resp = postService.save(request);
        return resp != null
                ? new ResponseEntity<>(resp, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
