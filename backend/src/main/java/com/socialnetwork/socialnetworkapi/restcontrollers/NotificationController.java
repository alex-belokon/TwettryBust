package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.service.NotificationService;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationDto;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationErrorDto;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationIdAndUserId;
import com.socialnetwork.socialnetworkapi.model.Post;
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
                                                @AuthenticationPrincipal UserDetails currentUser) {
        try {
            // Проверка на авторизацию пользователя
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
            }
            // Получаем пользователя из сессии
            Optional<User> recipient = getCurrentUser(currentUser);
            // Проверяем, найден ли пользователь
            if (recipient.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            // Получаем пользователя который отправил уведомления по его ID
            Optional<User> sender = userRepository.findById(notificationDto.getSender());
            if (sender.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            // Создаем уведомление с помощью сервиса уведомлений
            Notification createdNotification = notificationService.createNotification(sender, recipient, notificationDto.getNotificationType(), notificationDto.getPostId());
            // Получаем (UUID) для вывода
            NotificationDto responseDto = new NotificationDto();
            responseDto.setPostId(notificationDto.getPostId());
            responseDto.setNotificationId(createdNotification.getId());
            responseDto.setReceiver(recipient.get().getId());
            responseDto.setSender(sender.get().getId());
            responseDto.setNotificationType(notificationDto.getNotificationType());

            return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
        } catch (Exception e) {
            // Если произошла ошибка при создании уведомления, возвращаем ошибку INTERNAL_SERVER_ERROR
            NotificationErrorDto errorDto = new NotificationErrorDto("Failed to create notification: " + e.getMessage(), "CREATE_NOTIFICATION_ERROR");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDto);
        }
    }
    @Operation(summary = "Получение всех уведомлений для текущего пользователя" )
    @GetMapping
    public ResponseEntity<?> getAllNotificationsForCurrentUser(@AuthenticationPrincipal UserDetails currentUser) {
        try {
            // Проверка на авторизацию пользователя
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
            }
            // Получаем пользователя из сессии
            Optional<User> recipientUser = getCurrentUser(currentUser);
            if (recipientUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            // Получаем все уведомления для текущего пользователя
            List<Notification> notifications = notificationService.getAllNotificationsForUser(recipientUser);
            return ResponseEntity.ok().body(notifications);
        } catch (Exception e) {
            // В случае возникновения ошибки, формируем объект NotificationErrorDto с сообщением об ошибке и типом ошибки
            NotificationErrorDto errorDto = new NotificationErrorDto("Failed to get notifications: " + e.getMessage(), "GET_NOTIFICATIONS_ERROR");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDto);
        }
    }

    // Метод для получения текущего пользователя
    private Optional<User> getCurrentUser(UserDetails userDetails) {
        // Если переданное значение userDetails равно null, возвращаем пустой Optional
        if (userDetails == null) {
            return Optional.empty();
        }
        // Получаем имя пользователя из userDetails
        String username = userDetails.getUsername();
        return userRepository.findByUserName(username);
    }
}
