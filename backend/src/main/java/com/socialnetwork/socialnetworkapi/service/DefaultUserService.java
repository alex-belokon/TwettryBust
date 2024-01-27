package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.SubscriptionRepo;
import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.UserService;
import com.socialnetwork.socialnetworkapi.dto.RegistrationRequest;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.exception.UserServiceException;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.validation.Valid;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DefaultUserService implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(DefaultUserService.class);

    private final UserRepository userRepository;
    private final SubscriptionRepo subscriptionRepo;
    private final PasswordEncoder passwordEncoder;

    private Facade userMapper;

    public DefaultUserService(UserRepository userRepository, SubscriptionRepo subscriptionRepo, PasswordEncoder passwordEncoder, Facade userMapper) {
        this.userRepository = userRepository;
        this.subscriptionRepo = subscriptionRepo;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    private static final String USERNAME_ALREADY_TAKEN_MESSAGE = "Username is already taken";

    @Override
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public List<UserResponseShort> getUsersShortDTO(){
        return userRepository.findAll().stream().map(userMapper::userToShortDTO).toList();
    }
    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public UserResponseFull getUserDTOById(UUID req){
        User entity = userRepository.findById(req).orElseThrow(UserServiceException::new);
        UserResponseFull resp = userMapper.userToFullDTO(entity);
        resp.setFollowers(subscriptionRepo.getSubscriptionsByFollowingId(entity.getId()).size());
        resp.setFollowing(subscriptionRepo.getSubscriptionsByFollowerId(entity.getId()).size());
        return resp;
    }

    public User registerUser(@Valid RegistrationRequest registrationRequest) throws RegistrationException {
        validateRegistrationRequest(registrationRequest);

        Optional<User> existingUser = userRepository.findByUserName(registrationRequest.getUsername());
        if (existingUser.isPresent()) {
            throw new RegistrationException(USERNAME_ALREADY_TAKEN_MESSAGE);
        }

        User user = new User();
        user.setUserName(registrationRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setEmail(registrationRequest.getEmail());

        return userRepository.save(user);
    }
    //Нужен для Spring Security
    public UserDetailsService userDetailsService() {
        return this::getUserByUserName;
    }
    public User getCurrentUser() {
        // Получение имени пользователя из контекста Spring Security
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getUserByUserName(username);
    }

    @Override
    public User registerUserManual(String username, String password, String email) throws RegistrationException {

        Optional<User> existingUser = userRepository.findByUserName(username);
        if (existingUser.isPresent()) {
            throw new RegistrationException(USERNAME_ALREADY_TAKEN_MESSAGE);
        }

        User user = new User();
        user.setUserName(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);

        return userRepository.save(user);
    }

    private void validateRegistrationRequest(@Valid RegistrationRequest registrationRequest) throws RegistrationException {
        if (StringUtils.isBlank(registrationRequest.getUsername()) ||
                StringUtils.isBlank(registrationRequest.getPassword()) ||
                StringUtils.isBlank(registrationRequest.getEmail())) {
            throw new RegistrationException("All fields must be filled");
        }

    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("user not found with email: " + email));
    }

    @Override
    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("user not found with username: " + userName));
    }


    @Override
    public User updateUser(UUID userId, User updatedUser) {
        try {
            if (userRepository.existsById(userId)) {
                updatedUser.setId(userId);
                return userRepository.save(updatedUser);
            } else {
                //Оброботка ошибок
                throw new UsernameNotFoundException("user not found with ID" + userId);
            }
        }
        catch (Exception e){
            throw new UserServiceException("Failed to update user", e);
        }
    }

    @Override
    public void deleteUser(UUID userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            logger.info("user with ID {} deleted successfully", userId);
        } else {
            logger.warn("Attempt to delete non-existing user with ID {}", userId);
            // Можно выбрасывать исключение или просто логгировать предупреждение
        }
    }
}
