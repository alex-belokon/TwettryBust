package com.socialnetwork.socialnetworkapi.dao.service;

public interface PasswordResetService {

    String createPasswordResetToken(String userEmail);

    String validatePasswordResetToken(String token);

    boolean resetPassword(String token, String newPassword);
}

