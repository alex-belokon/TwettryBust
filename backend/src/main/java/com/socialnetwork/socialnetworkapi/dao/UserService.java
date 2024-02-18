package com.socialnetwork.socialnetworkapi.dao;

import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserService {
    List<User> getUsers();

    User createUser(User user);

    User getUserByEmail(String email);

    User getUserByUserName(String userName);

    User updateUser(UUID userId, User updatedUser);

    boolean deleteUser(UUID userId);

    UserDetails loadUserByEmail(String email) throws UsernameNotFoundException;

    Optional<User> findByEmailAndConfirmationToken(String email, String token);

}
