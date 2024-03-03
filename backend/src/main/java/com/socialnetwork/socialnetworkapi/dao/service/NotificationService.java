package com.socialnetwork.socialnetworkapi.dao.service;

import com.socialnetwork.socialnetworkapi.enums.NotificationType;
import com.socialnetwork.socialnetworkapi.model.Notification;
import com.socialnetwork.socialnetworkapi.model.User;

import java.util.List;
import java.util.Optional;

public interface NotificationService {

    Notification createNotification(Optional<User> sender, Optional<User> recipient, NotificationType notificationType);

    List<Notification> getAllNotificationsForUser(Optional<User> recipient);
}
