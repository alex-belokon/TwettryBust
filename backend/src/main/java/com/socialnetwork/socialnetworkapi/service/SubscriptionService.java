package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.SubscriptionRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.user.FollowRequest;
import com.socialnetwork.socialnetworkapi.model.Subscription;
import com.socialnetwork.socialnetworkapi.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public boolean toggleFollow(FollowRequest req) throws Exception {
        Optional<User> user1 = userRepository.findById(req.getUid1());
        Optional<User> user2 = userRepository.findById(req.getUid2());
        if (user1.isPresent() && user2.isPresent()) {
            Subscription subscription = subscriptionRepository.getSubscriptionByFollowingIdAndFollowerId(req.getUid2(), req.getUid1());
            if (subscription == null) {
                subscription = new Subscription(req.getUid1(), req.getUid2());
                subscriptionRepository.save(subscription);
                return true;
            } else {
                subscriptionRepository.delete(subscription);
                return false;
            }
        }
        throw new Exception("User not found");
    }

}
