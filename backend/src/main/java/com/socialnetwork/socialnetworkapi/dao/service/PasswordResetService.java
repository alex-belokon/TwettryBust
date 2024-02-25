package com.socialnetwork.socialnetworkapi.dao.service;

public interface PasswordResetService {

    void createPasswordResetToken(String userEmail);

    String validatePasswordResetToken(String token);

    void resetPassword(String token, String newPassword);
}

