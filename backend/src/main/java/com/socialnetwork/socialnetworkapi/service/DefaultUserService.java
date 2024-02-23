package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.SubscriptionRepo;
import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.service.UserService;
import com.socialnetwork.socialnetworkapi.dto.user.*;
import com.socialnetwork.socialnetworkapi.exception.UserServiceException;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.Subscription;
import com.socialnetwork.socialnetworkapi.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private static final String USERNAME_ALREADY_TAKEN_MESSAGE = "Username is already taken";
    private final UserRepository userRepository;
    private final SubscriptionRepo subscriptionRepo;
    private final Facade userMapper;
    private static final int pageSize = 8;

    public DefaultUserService(UserRepository userRepository, SubscriptionRepo subscriptionRepo, PasswordEncoder passwordEncoder, Facade userMapper) {
        this.userRepository = userRepository;
        this.subscriptionRepo = subscriptionRepo;
        this.userMapper = userMapper;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<UserResponseShort> getUsersDTO() {
        return userRepository.findAll().stream().map(userMapper::userToShortDTO).toList();
    }

    public UserResponseFull getUserFullDTOById(UUID req) {
        User entity = userRepository.findById(req).orElseThrow(UserServiceException::new);
        UserResponseFull resp = userMapper.userToFullDTO(entity);
        resp.setFollowers(subscriptionRepo.countAllByFollowingId(entity.getId()));
        resp.setFollowing(subscriptionRepo.countAllByFollowerId(entity.getId()));
        return resp;
    }

    public List<UserResponseFull> findByCreds(String credentials) {
        return
                userRepository.findAllByEmailContainingIgnoreCaseOrUserNameContainingIgnoreCaseOrFirstNameIsContainingIgnoreCase(credentials, credentials, credentials)
                        .stream().map(userMapper::userToFullDTO).toList();
    }

    public UserResponseFull edit(UUID id, UserRequest data) {
        User user = userRepository.findById(id).get();

        if (data.getUserName() != null) user.setUserName(data.getUserName());
        if (data.getFirstName() != null) user.setFirstName(data.getFirstName());
        if (data.getLastName() != null) user.setLastName(data.getLastName());
        if (data.getEmail() != null) user.setEmail(data.getEmail());
        if (data.getBio() != null) user.setBio(data.getBio());
        if (data.getLocation() != null) user.setLocation(data.getLocation());
        if (data.getWebsite() != null) user.setWebsite(data.getWebsite());
        if (data.getHeaderPhoto() != null) user.setHeaderPhoto(data.getHeaderPhoto());
        if (data.getDateOfBirth() != null) user.setDateOfBirth(data.getDateOfBirth());
        if (data.getAvatar() != null) user.setAvatar(data.getAvatar());
        if (data.getAddress() != null) user.setAddress(data.getAddress());

        return userMapper.userToFullDTO(userRepository.save(user));

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

    public List<UserResponseShort> getFollowersDTO(PageReq req) {
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        List<Subscription> subscriptions = subscriptionRepo.getSubscriptionsByFollowingIdAndFollowerIdIsNot(req.getUserId(), req.getUserId(), pageable);
        List<User> users = subscriptions.stream().map(subscription -> userRepository.findById(subscription.getFollowerId()).get()).toList();
        return mapFollows(req, users);
    }

    public List<UserResponseShort>  getFollowingDTO(PageReq req) {
        Pageable pageable = PageRequest.of(req.getPage(), pageSize, Sort.by("createdAt").descending());
        List<Subscription> subscriptions = subscriptionRepo.getAllByFollowerId(req.getUserId(), pageable);
        List<User> users = subscriptions.stream().map(subscription -> userRepository.findById(subscription.getFollowingId()).get()).toList();
        return mapFollows(req, users);
    }

    private List<UserResponseShort> mapFollows(PageReq req, List<User> users) {
        return users.stream().map(user -> {
            UserResponseShort resp = userMapper.userToShortDTO(user);
            resp.setIsFollowing(subscriptionRepo.getSubscriptionByFollowingIdAndFollowerId(req.getUserId(), user.getId()) != null);
            resp.setIsFollowed(subscriptionRepo.getSubscriptionByFollowerIdAndFollowingId(req.getUserId(), user.getId()) != null);
            return resp;
        }).toList();
    }

    public List<UserRecommended> getRecsAtPage(PageReq req){
        Pageable pageable = PageRequest.of(req.getPage(), pageSize);
        return userRepository.findUsersNotSubscribedByCurrentUser(req.getUserId(), pageable).stream().map(userMapper::toRecsDTO).toList();
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
        } catch (Exception e) {
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
    @Override
    public Optional<User> findByEmailAndConfirmationToken(String email, String token) {
        return userRepository.findByEmailAndConfirmationToken(email, token);
    }
    @Override
    public UserDetails loadUserByUsername(String userName)
            throws UsernameNotFoundException {
        return userRepository.findByUserName(userName)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format(
                                "User not found with username: " + userName
                        )));
    }

}
