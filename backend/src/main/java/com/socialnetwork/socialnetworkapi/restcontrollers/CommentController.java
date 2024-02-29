package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.comment.CommentDTO;
import com.socialnetwork.socialnetworkapi.model.Comment;
import com.socialnetwork.socialnetworkapi.service.CommentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<Page<Comment>> getCommentsByPostId(
            @PathVariable UUID postId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Page<Comment> comments = commentService.getCommentsByPostIdWithPagination(postId, PageRequest.of(page, size));
        return ResponseEntity.ok(comments);
    }

    // Додавання нового коментаря до поста
    @PostMapping
    public ResponseEntity<Comment> addComment(
            @PathVariable UUID postId,
            @PathVariable UUID userId,
            @RequestBody CommentDTO commentDTO) {
        Comment newComment = commentService.addComment(postId, userId, commentDTO);
        return ResponseEntity.ok(newComment);
    }

    // Видалення коментаря
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable UUID commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}


