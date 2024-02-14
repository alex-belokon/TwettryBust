package com.socialnetwork.socialnetworkapi.model.chat;

import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@Builder
@Getter
@Data
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Messages")
public class Message extends AbstractEntity {
    @ManyToOne
    @JoinColumn(name = "user_id") // Я правильно понял что senderId - это UserId?
    private User senderId;

    @Column(name = "content") // Текст который мы отправляем
    private String content;

    @Column(name = "date") // Дата отправки?
    private LocalDate date;

    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "chat_id")
    private UUID chatId;

    @Column(name = "imageUrl")
    private String imageURL;
}
