package com.socialnetwork.socialnetworkapi.dao;

import com.socialnetwork.socialnetworkapi.dto.RegistrationRequest;
import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserService {
    List<User> getUsers();

    User createUser(User user);

    User getUserByEmail(String email);

    User createUser(RegistrationRequest registrationRequest) throws RegistrationException;

    User registerUser(@Valid RegistrationRequest registrationRequest) throws RegistrationException;
    User registerUserManual(@Valid String username, String password, String email) throws RegistrationException; //TODO: удалить после релиза


    User getUserByUserName(String userName);

    User updateUser(UUID userId, User updatedUser);

    void deleteUser(UUID userId);
}
