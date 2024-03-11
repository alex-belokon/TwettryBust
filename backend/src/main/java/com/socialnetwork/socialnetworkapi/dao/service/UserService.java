package com.socialnetwork.socialnetworkapi.dao.service;

import com.socialnetwork.socialnetworkapi.model.User;
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

    UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException;

    Optional<User> findByEmailAndConfirmationToken(String email, String token);

    public void changeUserPassword(UUID userId, String newPassword);

}
