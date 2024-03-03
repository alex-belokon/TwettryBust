package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.NotificationRepository;
import com.socialnetwork.socialnetworkapi.dao.service.NotificationService;
import com.socialnetwork.socialnetworkapi.enums.NotificationType;
import com.socialnetwork.socialnetworkapi.model.Notification;
import com.socialnetwork.socialnetworkapi.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DefaultNotificationService implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public Notification createNotification(Optional<User> sender, Optional<User> recipient, NotificationType notificationType) {
        Notification notification = new Notification();
        notification.setNotificationType(notificationType);
        sender.ifPresent(notification::setSender);
        recipient.ifPresent(notification::setRecipient);
        notification.setRead(false);
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getAllNotificationsForUser(Optional<User> recipient) {
        return notificationRepository.findByRecipient(recipient);
    }
}
