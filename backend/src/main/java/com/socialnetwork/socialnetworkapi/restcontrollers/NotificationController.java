package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.service.NotificationService;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationDto;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationErrorDto;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationIdAndUserId;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationResponse;
import com.socialnetwork.socialnetworkapi.exception.BadRequestException;
import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.Notification;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@MessageMapping
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
    public ResponseEntity<?> createNotification(@RequestBody NotificationDto notificationDto, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Optional<User> sender    = userRepository.findById(this.getUserIdByUserDetails(userDetails));
            Optional<User> recipient = userRepository.findById(notificationDto.getReceiver());

            return ResponseEntity.status(HttpStatus.CREATED).body(notificationService.createAndMapNotification(sender, recipient, notificationDto.getNotificationType(), notificationDto.getPostId()));
        } catch (Exception e) {
            NotificationErrorDto errorDto = new NotificationErrorDto("Failed to create notification: " + e.getMessage(), "CREATE_NOTIFICATION_ERROR");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDto);
        }
    }
    @Operation(summary = "Отримання сповіщень з пагінацією" )
    @GetMapping
    public ResponseEntity<?> getAllNotificationsForCurrentUser(@AuthenticationPrincipal UserDetails userDetails, @RequestParam Integer page) {
        try {
            // Проверка на авторизацию пользователя
            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
            }
            // Получаем пользователя из сессии
            Optional<User> recipientUser = userRepository.findById(this.getUserIdByUserDetails(userDetails));
            if (recipientUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            // Получаем все уведомления для текущего пользователя
            List<Notification> notifications = notificationService.getAllNotificationsForUser(recipientUser, page);
            return ResponseEntity.ok().body(notifications);
        } catch (Exception e) {
            // В случае возникновения ошибки, формируем объект NotificationErrorDto с сообщением об ошибке и типом ошибки
            NotificationErrorDto errorDto = new NotificationErrorDto("Failed to get notifications: " + e.getMessage(), "GET_NOTIFICATIONS_ERROR");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDto);
        }
    }

    // Метод для получения текущего пользователя
    private UUID getUserIdByUserDetails(UserDetails userDetails) {
        return userRepository.findByUserName(userDetails.getUsername()).map(AbstractEntity::getId).orElse(null);
    }
}