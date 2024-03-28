package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationDto;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationErrorDto;
import com.socialnetwork.socialnetworkapi.exception.BadRequestException;
import com.socialnetwork.socialnetworkapi.exception.NotImplementedEx;
import com.socialnetwork.socialnetworkapi.model.Notification;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.service.DefaultNotificationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;

import java.util.*;
import java.util.function.Supplier;

@Controller
@AllArgsConstructor
@Slf4j
public class WebSocketControllerNotification {
    private final DefaultNotificationService notificationService;
    private final UserRepository userRepository;

    @MessageMapping("/createNotification") // Точка входа для получения сообщений WebSocket
    @SendTo("/topic/notifications") // Пункт назначения для отправки ответа
    public ResponseEntity<?> createNotificationWebSocket(NotificationDto notificationDto,
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

    private Optional<User> getCurrentUser(UserDetails userDetails) {
        // Если переданное значение userDetails равно null, возвращаем пустой Optional
        if (userDetails == null) {
            return Optional.empty();
        }
        // Получаем имя пользователя из userDetails
        String username = userDetails.getUsername();
        return userRepository.findByUserName(username);
    };
}