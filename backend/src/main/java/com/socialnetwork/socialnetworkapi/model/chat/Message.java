package com.socialnetwork.socialnetworkapi.model.chat;

import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Messages")
public class Message extends AbstractEntity {

    @ManyToOne
    private User sender; // Пользователь, отправивший сообщение

    private String content; // Содержание сообщения

    private Date timestamp; // Временная метка сообщения

    @ManyToOne
    private Chat chat; // Чат, к которому относится сообщение
}
