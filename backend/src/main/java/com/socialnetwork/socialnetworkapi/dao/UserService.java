package com.socialnetwork.socialnetworkapi.dao;

import com.socialnetwork.socialnetworkapi.model.User;

import java.util.List;
import java.util.UUID;


public interface UserService {
    List<User> getUsers();

    User createUser(User user);

    User getUserByEmail(String email);

    User getUserByUserName(String userName);

    User updateUser(UUID userId, User updatedUser);

    void deleteUser(UUID userId);
}
