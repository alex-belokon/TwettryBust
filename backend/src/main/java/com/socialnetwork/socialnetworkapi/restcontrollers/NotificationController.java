package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.service.NotificationService;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationDto;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationErrorDto;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.Notification;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @Autowired
    public NotificationController(NotificationService notificationService, UserRepository userRepository) {
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @Operation(summary = "Создание уведомления")
    @PostMapping
    public ResponseEntity<?> createNotification(@RequestBody NotificationDto notificationDto,
                                                @AuthenticationPrincipal UserDetails sender) {
        try {
            if (sender == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
            }
            String username = sender.getUsername();
            Optional<User> userSender = userRepository.findByUserName(username);
            if (userSender.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Optional<User> recipient = userRepository.findById(notificationDto.getRecipientId());
            notificationService.createNotification(notificationDto.getMessage(), userSender, recipient);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            NotificationErrorDto errorDto = new NotificationErrorDto("Failed to create notification: " + e.getMessage(), "CREATE_NOTIFICATION_ERROR");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDto);
        }
    }

    @Operation(summary = "Получение всех уведомлений для текущего пользователя")
    @GetMapping
    public ResponseEntity<?> getAllNotificationsForCurrentUser(@AuthenticationPrincipal UserDetails recipient) {
        try {
            String username = recipient.getUsername();
            Optional<User> userRecipient = userRepository.findByUserName(username);
            if (userRecipient.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            List<Notification> notifications = notificationService.getAllNotificationsForUser(userRecipient);
            return ResponseEntity.ok().body(notifications);
        } catch (Exception e) {
            NotificationErrorDto errorDto = new NotificationErrorDto("Failed to get notifications: " + e.getMessage(), "GET_NOTIFICATIONS_ERROR");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDto);
        }
    }

}
