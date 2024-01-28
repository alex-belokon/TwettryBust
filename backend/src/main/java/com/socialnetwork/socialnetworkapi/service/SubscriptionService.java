package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.SubscriptionRepo;

import java.util.UUID;

public class SubscriptionService {
    private final SubscriptionRepo repository;

    public SubscriptionService(SubscriptionRepo repository) {
        this.repository = repository;
    }

    public int getFollowersCount(UUID req) {
        return repository.getSubscriptionsByFollowingId(req).size();
    }

    public int getFollowingCount(UUID req) {
        return repository.getSubscriptionsByFollowerId(req).size();
    }

}
