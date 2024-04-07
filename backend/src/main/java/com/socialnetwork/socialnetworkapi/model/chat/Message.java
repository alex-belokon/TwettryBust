package com.socialnetwork.socialnetworkapi.model.chat;

import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Messages")
public class Message extends AbstractEntity {
    @ManyToOne
    @JoinColumn(name = "user_id") // Я правильно понял что senderId - это UserId?
    private User sender;

    @Column(name = "content") // Текст который мы отправляем
    private String content;

    @Column(name = "date") // Дата отправки?
    private LocalDateTime date;

    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "chat_id")
    private UUID chatId;

    @Column(name = "imageUrl")
    private String imageURL;

    @Column(name = "avatarUrl")
    private String avatarUrl;

    @Column(name = "is_read")
    private Boolean read;
}
