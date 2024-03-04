package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> getPostsByUserId(UUID req, Pageable page);
    Post getPostById(UUID req);

    @Query("SELECT p FROM Post p JOIN Subscription s ON p.userId = s.followingId WHERE s.followerId = :followerId")
    List<Post> findPostsByFollowedUsers(@Param("followerId") UUID followerId, Pageable pageable);

    List<Post> findAllByUserId(UUID req);

    Integer countAllByUserId(UUID req);
    List<Post> findAllByCommunityId(UUID communityId, Pageable page);
    List<Post> getAllByCommunityId(UUID cid);
     void deleteAllByCommunityId(UUID communityId);
}
