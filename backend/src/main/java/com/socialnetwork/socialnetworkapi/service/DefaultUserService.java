package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.SubscriptionRepo;
import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.UserService;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.exception.UserServiceException;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.Subscription;
import com.socialnetwork.socialnetworkapi.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class DefaultUserService implements UserService  {
    private static final Logger logger = LoggerFactory.getLogger(DefaultUserService.class);

    private final UserRepository userRepository;
    private final SubscriptionRepo subscriptionRepo;
    private final Facade userMapper;

    public DefaultUserService(UserRepository userRepository, SubscriptionRepo subscriptionRepo, PasswordEncoder passwordEncoder, Facade userMapper) {
        this.userRepository = userRepository;
        this.subscriptionRepo = subscriptionRepo;
        this.userMapper = userMapper;
    }

    private static final String USERNAME_ALREADY_TAKEN_MESSAGE = "Username is already taken";

    @Override
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public  List<UserResponseShort> getUsersDTO(){
        return userRepository.findAll().stream().map(user -> userMapper.userToShortDTO(user, null)).toList();
    }

    public List<UserResponseShort> getUsersShortDTOList(UUID req){
        List<Subscription> subscriptions = subscriptionRepo.getSubscriptionsByFollowerId(req);
        List<User> users = subscriptions.stream().map(subscription -> userRepository.findById(subscription.getFollowingId()).orElseThrow()).toList();
        return users.stream().map(user -> userMapper.userToShortDTO(user , req)).toList();
    }
    public UserResponseFull getUserFullDTOById(UUID req){
        User entity = userRepository.findById(req).orElseThrow(UserServiceException::new);
        UserResponseFull resp = userMapper.userToFullDTO(entity);
        resp.setFollowers(subscriptionRepo.getSubscriptionsByFollowingId(entity.getId()) != null ? subscriptionRepo.getSubscriptionsByFollowingId(entity.getId()).size() : 0);
        resp.setFollowing(subscriptionRepo.getSubscriptionsByFollowerId(entity.getId()) != null ? subscriptionRepo.getSubscriptionsByFollowerId(entity.getId()).size() : 0);
        return resp;
    }
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }


    //Нужен для Spring Security
    public UserDetailsService userDetailsService() {
        return this::getUserByEmail;
    }
    public User getCurrentUser() {
        // Получение имени пользователя из контекста Spring Security
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getUserByUserName(username);
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

    public List<UserResponseShort> getFollowingDTO(UUID uid){
        List<Subscription> subscriptions = subscriptionRepo.getSubscriptionsByFollowingId(uid);
        List<User> users = subscriptions.stream().map(subscription -> userRepository.findById(subscription.getFollowerId()).orElseThrow()).toList();
        return users.stream().map(user -> userMapper.userToShortDTO(user, uid)).toList();
    }
    public List<UserResponseShort> getFollowersDTO(UUID uid){
        List<Subscription> subscriptions = subscriptionRepo.getSubscriptionsByFollowerId(uid);
        List<User> users = subscriptions.stream().map(subscription -> userRepository.findById(subscription.getFollowingId()).orElseThrow()).toList();
        return users.stream().map(user -> userMapper.userToShortDTO(user, uid)).toList();
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
    public boolean deleteUser(UUID userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            logger.info("user with ID {} deleted successfully", userId);
            return true;
        } else {
            logger.warn("Attempt to delete non-existing user with ID {}", userId);
            return false;
            // Можно выбрасывать исключение или просто логгировать предупреждение
        }
    }
    @Override
    public UserDetails loadUserByEmail(String email)
            throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format(
                                "user not found with email: " + email
                        )));
    }

}
