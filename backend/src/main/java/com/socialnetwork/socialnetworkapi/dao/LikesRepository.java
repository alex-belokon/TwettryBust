package com.socialnetwork.socialnetworkapi.dao;

import com.socialnetwork.socialnetworkapi.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface LikesRepository extends JpaRepository<Like, UUID> {
    Like getByUserIdAndPostId(UUID userId, UUID postId);

    Integer countAllByPostId(UUID postId);

    List<Like> getLikesByUserId(UUID req);
}
