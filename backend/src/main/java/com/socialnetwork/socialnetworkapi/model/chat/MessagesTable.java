package com.socialnetwork.socialnetworkapi.model.chat;

import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "messages_Table")
public class MessagesTable extends AbstractClass {
    @ManyToOne
    @JoinColumn(name = "user_id") // Я правильно понял что senderId - это UserId?
    private User senderId;

    @Column(name = "content") // Текст который мы отправляем
    private String content;

    @Column(name = "date") // Дата отправки?
    private LocalDate date;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "chat_id")
    private UUID chatId;
}
