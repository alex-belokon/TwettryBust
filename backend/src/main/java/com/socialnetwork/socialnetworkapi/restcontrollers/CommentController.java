package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dto.comment.CommentDTO;
import com.socialnetwork.socialnetworkapi.model.Comment;
import com.socialnetwork.socialnetworkapi.service.CommentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Получение комментариев к посту с пагинацией
    @GetMapping
    public ResponseEntity<?> getCommentsByPostIdWithPagination(
            @PathVariable UUID postId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        try {
            Page<Comment> comments = commentService.getCommentsByPostIdWithPagination(postId, PageRequest.of(page, size));
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            // Обработка ошибки, например, если пост не найден
            return ResponseEntity.badRequest().body("Error message or object");
        }
    }

    // Добавление нового комментария к посту
    @PostMapping
    public ResponseEntity<?> addComment(
            @PathVariable UUID postId,
            @RequestBody CommentDTO commentDTO) {
        try {
            Comment newComment = commentService.addComment(postId, commentDTO);
            return ResponseEntity.ok(newComment);
        } catch (Exception e) {
            // Обработка ошибки, например, если данные не валидны
            return ResponseEntity.badRequest().body("Error message or object");
        }
    }

    // Удаление комментария
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable UUID commentId) {
        try {
            commentService.deleteComment(commentId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Обработка ошибки, например, если комментарий не найден
            return ResponseEntity.notFound().build();
        }
    }

    // Получение комментариев к посту без пагинации
    @GetMapping("/all")
    public ResponseEntity<?> getCommentsByPostId(
            @PathVariable UUID postId) {
        try {
            List<Comment> comments = commentService.getCommentsByPostId(postId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            // Обработка ошибки
            return ResponseEntity.badRequest().body("Error message or object");
        }
    }
}




