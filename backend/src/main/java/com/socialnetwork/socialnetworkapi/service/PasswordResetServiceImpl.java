package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.PasswordResetTokenRepository;
import com.socialnetwork.socialnetworkapi.dao.service.PasswordResetService;
import com.socialnetwork.socialnetworkapi.model.PasswordResetTokenEntity;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
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
    public String createPasswordResetToken(String userEmail) {
        User user = userService.getUserByEmail(userEmail);
        if (user != null) {
            String tokenValue = UUID.randomUUID().toString();
            PasswordResetTokenEntity token = new PasswordResetTokenEntity();
            Date currentDate = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(currentDate);
            calendar.add(Calendar.MINUTE, 20);
            Date expiryDate = calendar.getTime();
            token.setToken(tokenValue);
            token.setUser(user);
            token.setExpiryDate(expiryDate);
            tokenRepository.save(token);
            emailService.sendResetTokenEmail(userEmail, tokenValue);
            return token.getToken();
        }
        return null;
    }

    @Override
    public String validatePasswordResetToken(String token) {
        PasswordResetTokenEntity resetToken = tokenRepository.findByToken(token);
        Date currentDate = new Date();
        if (resetToken == null || currentDate.toInstant().isAfter(resetToken.getExpiryDate().toInstant()) ) {
            tokenRepository.delete(tokenRepository.findByToken(token));
            return null;
        }
        // Check for expiry and other validation
        return token;
    }

    @Override
    public boolean resetPassword(String token, String newPassword) {
        PasswordResetTokenEntity resetToken = tokenRepository.findByToken(token);
        if (resetToken != null) {
            if (validatePasswordResetToken(token) != null) {
                User user = resetToken.getUser();
                // Update user password and handle other necessary actions
                userService.changeUserPassword(user.getId(), newPassword);
                tokenRepository.delete(tokenRepository.findByToken(token));
                return true;
            }
        }
        return false;
    }
}