package com.socialnetwork.socialnetworkapi.dao;

import com.socialnetwork.socialnetworkapi.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
}
