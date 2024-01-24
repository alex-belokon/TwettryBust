package com.socialnetwork.socialnetworkapi.dao;

import com.socialnetwork.socialnetworkapi.dto.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.UserResponse;
import com.socialnetwork.socialnetworkapi.model.User;

import java.util.List;
import java.util.UUID;


public interface UserService {
    List<UserResponse> getUsers();

    UserResponse createUser(UserRequest user);

    UserResponse getUserByID(UUID userID);

    UserResponse getUserByEmail(String email);

    UserResponse getUserByUserName(String userName);

    UserResponse updateUser(UUID userId, User updatedUser);

    void deleteUser(UUID userId);
}
