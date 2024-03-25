package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.NotificationRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.PostRepository;
import com.socialnetwork.socialnetworkapi.dao.service.NotificationService;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationDto;
import com.socialnetwork.socialnetworkapi.dto.notification.NotificationResponse;
import com.socialnetwork.socialnetworkapi.enums.NotificationType;
import com.socialnetwork.socialnetworkapi.exception.BadRequestException;
import com.socialnetwork.socialnetworkapi.exception.NotImplementedEx;
import com.socialnetwork.socialnetworkapi.model.Notification;
import com.socialnetwork.socialnetworkapi.model.Post;
import com.socialnetwork.socialnetworkapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DefaultNotificationService extends NotificationService {

    private final NotificationRepository notificationRepository;
    private final PostRepository postRepository;
    private final SimpMessagingTemplate messagingTemplate;

    private final Integer pageSize = 20;
    @Autowired
    public DefaultNotificationService(NotificationRepository notificationRepository, PostRepository postRepository, SimpMessagingTemplate messagingTemplate) {
        this.notificationRepository = notificationRepository;
        this.postRepository = postRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    // Метод для создания нового уведомления
    public Notification createNotification(Optional<User> sender, Optional<User> recipient, NotificationType notificationType, UUID postId)  {
        // Проверяем, найдены ли отправитель и получатель уведомления
        if (sender.isEmpty() || recipient.isEmpty()) {
            throw new BadRequestException("Sender or recipient not found");
        }


        Notification notification = new Notification();
        notification.setNotificationType(notificationType);
        sender.ifPresent(notification::setSender);
        recipient.ifPresent(notification::setRecipient);
        notification.setRead(false);
        notification.setPostId(postId);
        return notificationRepository.save(notification);
    }
    @Override
    public NotificationResponse createAndMapNotification(Optional<User> sender, Optional<User> recipient, NotificationType notificationType, UUID postId){
        Notification notification = createNotification(sender, recipient, notificationType, postId);
        return new NotificationResponse(notification);
    }

    @Override
    public NotificationResponse createAndNotify(Optional<User> sender, Optional<User> recipient, NotificationType notificationType, UUID postId){
        NotificationResponse response = this.createAndMapNotification(sender, recipient, notificationType, postId);
        this.notifyUser(response);
        return response;
    }
    @Override
    // Метод для получения всех уведомлений для конкретного пользователя
    public List<Notification> getAllNotificationsForUser(Optional<User> recipient, Integer page) {
        Pageable pageable =  PageRequest.of(page, this.pageSize, Sort.by("createdAt").descending());
        return notificationRepository.findByRecipient(recipient, pageable);
    }

    private void notifyUser(NotificationResponse notification){
//        messagingTemplate.convertAndSendToUser(notification.getRecipientId().toString(), "/topic/notification", notification); // "/user/{id}/topic/notification"
        messagingTemplate.convertAndSend("/"+notification.getRecipientId()+"/notification", notification);
    }

    @Override
    public Boolean toggleIsRead(UUID userId, UUID notificationId){
        throw new NotImplementedEx("METHOD DefaultNotificationService.toggleIsRead CURRENTLY UNSUPPORTED");
    }

}
