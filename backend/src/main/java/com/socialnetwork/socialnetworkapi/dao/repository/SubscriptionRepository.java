package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.Subscription;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
    List<Subscription> getAllByFollowerId(UUID req, Pageable page);

    Integer countAllByFollowerId(UUID req);

    Integer countAllByFollowingId(UUID req);

    List<Subscription> getSubscriptionsByFollowingIdAndFollowerIdIsNot(UUID uid1, UUID uid2, Pageable page);

    Subscription getSubscriptionByFollowingIdAndFollowerId(UUID uid1, UUID uid2);

    Subscription getSubscriptionByFollowerIdAndFollowingId(UUID uid1, UUID uid2);
}
