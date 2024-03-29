package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.Favorite;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorite, UUID> {
    Favorite getByUserIdAndPostId(UUID userId, UUID postId);

    List<Favorite> getFavoritesByUserId(UUID req, Pageable pageable);

    void deleteAllByPostId(UUID postId);
}
