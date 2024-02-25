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
        passwordResetService.createPasswordResetToken(email);
        return ResponseEntity.ok("Password reset token sent successfully");
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
                                                @RequestParam("password") String newPassword) {
        passwordResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password reset successfully");
    }
}



