package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String userName);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

    List<User> findAllByEmailContainingIgnoreCaseOrUserNameContainingIgnoreCaseOrFirstNameIsContainingIgnoreCase(String email, String username, String firstName);

    Optional<User> findByEmailAndConfirmationToken(String email, String token);

    @Query("SELECT u FROM User u WHERE u.id != :userId AND u.id NOT IN (SELECT s.followingId FROM Subscription s WHERE s.followerId = :userId)")
    List<User> findUsersNotSubscribedByCurrentUser(@Param("userId") UUID userId, Pageable page);
}