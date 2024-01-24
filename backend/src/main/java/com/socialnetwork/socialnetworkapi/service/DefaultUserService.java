package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.UserService;
import com.socialnetwork.socialnetworkapi.dto.UserRequest;
import com.socialnetwork.socialnetworkapi.dto.UserResponse;
import com.socialnetwork.socialnetworkapi.exception.UserServiceException;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.mapper.UserMapper;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class DefaultUserService implements UserService {
    private final UserRepository  userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired private Facade mapper;

    public DefaultUserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<UserResponse> getUsers(){
        return userRepository.findAll().stream().map(mapper::userToDTO).toList();
    }
    @Override
    public UserResponse createUser(UserRequest dto) {
        User data = mapper.userFromDTO(dto);
        data.setPassword(passwordEncoder.encode(data.getPassword()));
        return mapper.userToDTO(userRepository.save(data));
    }

    @Override public UserResponse getUserByID(UUID userID) {
        return mapper.userToDTO(userRepository.findById(userID).orElseThrow(() ->
                new UsernameNotFoundException("User not found with ID: " + userID)));
    }

    @Override public UserResponse getUserByEmail   (String email) {
        return mapper.userToDTO(userRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("User not found with email: " + email)));
    }
    @Override public UserResponse getUserByUserName(String userName) {
        return mapper.userToDTO(userRepository.findByUserName(userName).orElseThrow(() ->
                new UsernameNotFoundException("User not found with username: " + userName)));
    }

    @Override public UserResponse updateUser       (UUID userId, User updatedUser) {
        try {
            if (userRepository.existsById(userId)) {
                updatedUser.setId(userId);
                return mapper.userToDTO(userRepository.save(updatedUser));
            } else {
                throw new UsernameNotFoundException("User not found with ID" + userId);
            }
        }
        catch (Exception e){
            throw new UserServiceException("Failed to update user", e);
        }
    }

    @Override
    public void deleteUser(UUID userId) {
        userRepository.deleteById(userId);
    }
}
