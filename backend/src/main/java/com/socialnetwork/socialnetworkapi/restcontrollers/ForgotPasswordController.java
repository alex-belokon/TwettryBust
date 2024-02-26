package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password-reset")
public class ForgotPasswordController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/request")
    public ResponseEntity<String> requestPasswordReset(@RequestParam("email") String email) {
        String response = passwordResetService.createPasswordResetToken(email);
        if (response == null) {
            return ResponseEntity.badRequest().body("User not found for sending email");
        } else {
            return ResponseEntity.ok().body("Successfully sending email");
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestParam("token") String token) {
        String validationResult = passwordResetService.validatePasswordResetToken(token);
        if (validationResult == null) {
            return ResponseEntity.ok("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(validationResult);
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token,
                                                @RequestParam("password") String newPassword1,
                                                @RequestParam("passwordConfirm") String newPassword2) {

        if (newPassword1.equals(newPassword2)) {

            boolean isResetSuccessful = passwordResetService.resetPassword(token, newPassword1);
            if (isResetSuccessful) {
                return ResponseEntity.ok("Password reset successfully");
            } else {
                return ResponseEntity.badRequest().body("Failed to reset password");
            }
        }

        return ResponseEntity.badRequest().body("Failed to reset password : Password1 isn`t equal Password2 ");


    }

}



