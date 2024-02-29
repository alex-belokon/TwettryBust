package com.socialnetwork.socialnetworkapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.socialnetwork.socialnetworkapi.dao.repository.CommentRepository;
import com.socialnetwork.socialnetworkapi.dto.comment.CommentDTO;
import com.socialnetwork.socialnetworkapi.model.Comment;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.dao.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public List<Comment> getCommentsByPostId(UUID postId) {
        return commentRepository.findAllByPostId(postId);
    }

    public Comment addComment(UUID postId, UUID userId, CommentDTO commentDTO) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        Comment comment = new Comment();
        comment.setPostId(post.getId());
        comment.setUserId(userId);
        comment.setText(commentDTO.getText());
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public void deleteComment(UUID commentId) {
        commentRepository.deleteById(commentId);
    }

    public Page<Comment> getCommentsByPostIdWithPagination(UUID postId, Pageable pageable) {
        return commentRepository.findByPostId(postId, pageable);
    }
}






