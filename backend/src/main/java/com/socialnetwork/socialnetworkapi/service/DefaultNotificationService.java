package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.NotificationRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.PostRepository;
import com.socialnetwork.socialnetworkapi.dao.service.NotificationService;
import com.socialnetwork.socialnetworkapi.enums.NotificationType;
import com.socialnetwork.socialnetworkapi.exception.BadRequestException;
import com.socialnetwork.socialnetworkapi.exception.NotFoundException;
import com.socialnetwork.socialnetworkapi.model.Notification;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DefaultNotificationService extends NotificationService {

    private final NotificationRepository notificationRepository;
    private final PostRepository postRepository;

    @Autowired
    public DefaultNotificationService(NotificationRepository notificationRepository, PostRepository postRepository) {
        this.notificationRepository = notificationRepository;
        this.postRepository = postRepository;
    }

    @Override
    // Метод для создания нового уведомления
    public Notification createNotification(Optional<User> sender, Optional<User> recipient, NotificationType notificationType, UUID postId) throws NotFoundException {
        // Проверяем, найдены ли отправитель и получатель уведомления
        if (sender.isEmpty() || recipient.isEmpty()) {
            throw new BadRequestException("Sender or recipient not found");
        }
        // Проверяем, существует ли пост с указанным идентификатором
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new NotFoundException("Post not found with ID: " + postId);
        }
        Notification notification = new Notification();
        notification.setNotificationType(notificationType);
        sender.ifPresent(notification::setSender);
        recipient.ifPresent(notification::setRecipient);
        notification.setRead(false);
        notification.setPost(optionalPost.get());
        return notificationRepository.save(notification);
    }


    @Override
    // Метод для получения всех уведомлений для конкретного пользователя
    public List<Notification> getAllNotificationsForUser(Optional<User> recipient) {
        return notificationRepository.findByRecipient(recipient);
    }
}
