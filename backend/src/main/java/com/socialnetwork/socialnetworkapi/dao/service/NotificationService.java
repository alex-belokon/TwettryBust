package com.socialnetwork.socialnetworkapi.dao.service;

import com.socialnetwork.socialnetworkapi.dto.notification.NotificationResponse;
import com.socialnetwork.socialnetworkapi.enums.NotificationType;
import com.socialnetwork.socialnetworkapi.exception.NotFoundException;
import com.socialnetwork.socialnetworkapi.model.Notification;
import com.socialnetwork.socialnetworkapi.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public abstract class NotificationService {

    // Метод для создания нового уведомления
    public abstract Notification createNotification(Optional<User> sender, Optional<User> recipient, NotificationType notificationType, UUID postId) throws NotFoundException;

    // Метод для получения всех уведомлений для конкретного пользователя
    public abstract List<Notification> getAllNotificationsForUser(Optional<User> recipient, Integer page);

    public abstract NotificationResponse createAndMapNotification(Optional<User> sender, Optional<User> recipient, NotificationType notificationType, UUID postId);

    public abstract NotificationResponse createAndNotify(Optional<User> sender, Optional<User> recipient, NotificationType notificationType, UUID postId);
    public abstract Boolean toggleIsRead(UUID userid, UUID notificationId);
}