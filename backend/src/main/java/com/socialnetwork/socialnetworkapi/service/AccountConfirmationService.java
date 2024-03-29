package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class AccountConfirmationService {

    private final UserRepository userRepository;
    @Value("${backend.url}")
    private String backendUrl;

    public AccountConfirmationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isValidToken(String token, String email) {
        Optional<User> optionalUser = userRepository.findByEmailAndConfirmationToken(email, token);
        return optionalUser.isPresent();
    }

    public void confirmAccount(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        optionalUser.ifPresent(user -> {
            generateConfirmationLink(email);
            user.setAccountActivated(true);
            userRepository.save(user);
        });
    }

    private String generateConfirmationLink(String email) {
        UUID uuid = UUID.randomUUID();
        // Формирование ссылки с UUID и адресом электронной почты
        return backendUrl +"/api/email/confirm-account?token=" + uuid + "&email=" + email;
    }
}
