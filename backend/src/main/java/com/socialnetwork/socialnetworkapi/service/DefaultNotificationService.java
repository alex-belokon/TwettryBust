package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.NotificationRepository;
import com.socialnetwork.socialnetworkapi.dao.service.NotificationService;
import com.socialnetwork.socialnetworkapi.enums.NotificationType;
import com.socialnetwork.socialnetworkapi.model.Notification;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DefaultNotificationService extends NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public DefaultNotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    // Метод для создания нового уведомления
    public Notification createNotification(String message, Optional<User> sender, Optional<User> recipient, NotificationType notificationType) {
        Notification notification = new Notification();
        notification.setMessageContent(message);
        notification.setNotificationType(notificationType);
        sender.ifPresent(notification::setSender);
        recipient.ifPresent(notification::setRecipient);
        notification.setRead(false);
        return notificationRepository.save(notification);
    }

    @Override
    // Метод для получения всех уведомлений для конкретного пользователя
    public List<Notification> getAllNotificationsForUser(Optional<User> recipient) {
        return notificationRepository.findByRecipient(recipient);
    }
}
