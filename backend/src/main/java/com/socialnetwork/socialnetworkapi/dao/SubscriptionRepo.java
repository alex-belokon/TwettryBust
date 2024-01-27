package com.socialnetwork.socialnetworkapi.dao;

import com.socialnetwork.socialnetworkapi.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubscriptionRepo extends JpaRepository<Subscription, UUID> {
    List<Subscription> getSubscriptionsByFollowerId(UUID req);
    List<Subscription> getSubscriptionsByFollowingId(UUID req);
}
