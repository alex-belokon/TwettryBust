package com.socialnetwork.socialnetworkapi.dao.service;

import com.socialnetwork.socialnetworkapi.model.Notification;
import com.socialnetwork.socialnetworkapi.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public abstract class NotificationService {

    // Метод для создания нового уведомления
    public abstract void createNotification(String message, Optional<User> sender, Optional<User> recipient);

    // Метод для получения всех уведомлений для конкретного пользователя
    public abstract List<Notification> getAllNotificationsForUser(Optional<User> recipient);
}
