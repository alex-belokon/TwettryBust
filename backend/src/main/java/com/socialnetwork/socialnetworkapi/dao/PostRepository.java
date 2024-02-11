package com.socialnetwork.socialnetworkapi.dao;

import com.socialnetwork.socialnetworkapi.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> getPostsByUserId(UUID req);
}
