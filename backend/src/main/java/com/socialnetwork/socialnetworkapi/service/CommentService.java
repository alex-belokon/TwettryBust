package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.CommentRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.PostRepository;
import com.socialnetwork.socialnetworkapi.dto.comment.CommentDTO;
import com.socialnetwork.socialnetworkapi.model.Comment;
import com.socialnetwork.socialnetworkapi.model.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public List<Comment> getCommentsByPostId(UUID postId) {

        List<Comment> comments = commentRepository.findAllByPostId(postId);

        // Сортируем комментарии по дате создания (createdAt) в обратном порядке
        comments.sort(Comparator.comparing(Comment::getCreatedAt).reversed());

        return comments;
    }

    public Comment addComment(UUID postId, CommentDTO commentDTO) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        Comment comment = new Comment();
        comment.setPostId(post.getId());
        comment.setUserId(commentDTO.getUserId());
        comment.setUserName(commentDTO.getUserName());
        comment.setFirstName(commentDTO.getFirstName());
        comment.setLastName(commentDTO.getLastName());
        comment.setAvatar(commentDTO.getAvatar());
        comment.setContent(commentDTO.getContent());
        comment.setAttachment(commentDTO.getAttachment());
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public void deleteComment(UUID commentId) {
        commentRepository.deleteById(commentId);
    }

    public Page<Comment> getCommentsByPostIdWithPagination(UUID postId, Pageable pageable) {
        // Создаем объект сортировки по дате создания в обратном порядке (от новых к старым)
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");

        // Создаем новый объект Pageable с указанными параметрами пагинации и сортировки
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                sort
        );

        // Возвращаем страницу комментариев с учетом сортировки
        return commentRepository.findByPostId(postId, sortedPageable);
    }

    public Integer getCommentCountByPostId(UUID postId) {
        return commentRepository.countByPostId(postId);
    }

}