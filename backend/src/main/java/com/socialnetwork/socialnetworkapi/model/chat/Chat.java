package com.socialnetwork.socialnetworkapi.model.chat;

import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Builder
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Chats")
public class Chat extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; //request

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator; //sender

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "timestamp")
    private Date timestamp; // Временная метка сообщения

}
