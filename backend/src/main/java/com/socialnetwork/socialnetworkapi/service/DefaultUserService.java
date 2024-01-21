package com.socialnetwork.socialnetworkapi.service;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.UserService;
import com.socialnetwork.socialnetworkapi.dto.RegistrationRequest;
import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.exception.UserServiceException;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final PasswordEncoder passwordEncoder;

    public DefaultUserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getUsers(){
        return userRepository.findAll();
    }
    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    @Override
    public User createUser(RegistrationRequest registrationRequest) throws RegistrationException {
        // Проверяем, существует ли пользователь с таким именем или email
        if (userRepository.existsByUserName(registrationRequest.getUsername())) {
            throw new RegistrationException("Username is already taken");
        }

        if (userRepository.existsByEmail(registrationRequest.getEmail())) {
            throw new RegistrationException("Email is already registered");
        }

        // Создаем нового пользователя
        User newUser = new User();
        newUser.setUserName(registrationRequest.getUsername());
        newUser.setEmail(registrationRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

        // Сохраняем пользователя в репозитории
        return userRepository.save(newUser);
    }

    public User registerUser(@Valid RegistrationRequest registrationRequest) throws RegistrationException {
        validateRegistrationRequest(registrationRequest);

        Optional<User> existingUser = userRepository.findByUserName(registrationRequest.getUsername());
        if (existingUser.isPresent()) {
            throw new RegistrationException("Username is already taken");
        }

        User user = new User();
        user.setUserName(registrationRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setEmail(registrationRequest.getEmail());

        return userRepository.save(user);
    }

    @Override
    public User registerUserManual(String username, String password, String email) throws RegistrationException {

        Optional<User> existingUser = userRepository.findByUserName(username);
        if (existingUser.isPresent()) {
            throw new RegistrationException("Username is already taken");
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
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    @Override
    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + userName));
    }

    @Override
    public User updateUser(UUID userId, User updatedUser) {
        try {
            if (userRepository.existsById(userId)) {
                updatedUser.setId(userId);
                return userRepository.save(updatedUser);
            } else {
                //Оброботка ошибок
                throw new UsernameNotFoundException("User not found with ID" + userId);
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
            logger.info("User with ID {} deleted successfully", userId);
        } else {
            logger.warn("Attempt to delete non-existing user with ID {}", userId);
            // Можно выбрасывать исключение или просто логгировать предупреждение
        }
    }
}
