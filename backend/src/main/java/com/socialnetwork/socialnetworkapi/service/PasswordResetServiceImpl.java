package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.PasswordResetTokenRepository;
import com.socialnetwork.socialnetworkapi.dao.service.PasswordResetService;
import com.socialnetwork.socialnetworkapi.model.PasswordResetTokenEntity;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    @Autowired
    private DefaultUserService userService;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private DefaultEmailService emailService;

    @Override
    public void createPasswordResetToken(String userEmail) {
        User user = userService.getUserByEmail(userEmail);
        if (user != null) {
            String tokenValue = UUID.randomUUID().toString();
            PasswordResetTokenEntity token = new PasswordResetTokenEntity();
            token.setToken(tokenValue);
            token.setUser(user);
            // Set expiry date appropriately, for example:
            // token.setExpiryDate(new Date(System.currentTimeMillis() + EXPIRATION_TIME));
            tokenRepository.save(token);
            emailService.sendResetTokenEmail(userEmail, tokenValue);
        }
    }

    @Override
    public String validatePasswordResetToken(String token) {
        PasswordResetTokenEntity resetToken = tokenRepository.findByToken(token);
        if (resetToken == null) {
            return "invalidToken";
        }
        // Check for expiry and other validation
        return null;
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        PasswordResetTokenEntity resetToken = tokenRepository.findByToken(token);
        if (resetToken != null) {
            User user = resetToken.getUser();
            // Update user password and handle other necessary actions
            userService.changeUserPassword(user.getId(), newPassword);
        }
    }
}