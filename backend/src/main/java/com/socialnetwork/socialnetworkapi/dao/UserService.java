package com.socialnetwork.socialnetworkapi.dao;

import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;


public interface UserService {
    List<User> getUsers();

    User createUser(User user);

    User getUserByEmail(String email);


    User registerUserManual(@Valid String username, String password, String email) throws RegistrationException; // удалить после релиза


    User getUserByUserName(String userName);

    User updateUser(UUID userId, User updatedUser);

    void deleteUser(UUID userId);

}
