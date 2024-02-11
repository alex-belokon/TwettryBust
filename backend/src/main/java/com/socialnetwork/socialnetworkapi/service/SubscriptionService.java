package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.SubscriptionRepo;
import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.user.FollowRequest;
import com.socialnetwork.socialnetworkapi.model.Subscription;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SubscriptionService {
    private final SubscriptionRepo repository;

    private final UserRepository   userRepository;

    public SubscriptionService(SubscriptionRepo repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public int getFollowersCount(UUID req) {
        return repository.getSubscriptionsByFollowingId(req).size();
    }

    public int getFollowingCount(UUID req) {
        return repository.getSubscriptionsByFollowerId(req).size();
    }

    public boolean toggleFollow(FollowRequest req) throws Exception {
        Optional<User> user1 = userRepository.findById(req.getUid1());
        Optional<User> user2 = userRepository.findById(req.getUid2());
        if (user1.isPresent() && user2.isPresent()) {
            Subscription subscription = repository.getSubscriptionByFollowingIdAndFollowerId(req.getUid1(), req.getUid2());
            if (subscription == null) {
                subscription = new Subscription(req.getUid1(), req.getUid2());
                repository.save(subscription);
                return true;
            } else {
                repository.delete(subscription);
                return false;
            }
        }
        throw new Exception("User not found");
    }

}
