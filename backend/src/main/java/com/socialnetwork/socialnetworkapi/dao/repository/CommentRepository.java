package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findAllByPostId(UUID postId);

    Page<Comment> findByPostId(UUID postId, org.springframework.data.domain.Pageable pageable);

    void deleteAllByPostId(UUID postId);

    Integer countByPostId(UUID postId);

}