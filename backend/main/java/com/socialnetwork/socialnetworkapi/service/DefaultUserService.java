package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.UserService;
import com.socialnetwork.socialnetworkapi.exception.UserServiceException;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultUserService implements UserService {
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
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email); // TODO: Нужно реазиловать, сейчас метод пустышка
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username); // TODO: Нужно реазиловать, сейчас метод пустышка
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
        userRepository.deleteById(userId);
    }
}
