//package com.socialnetwork.socialnetworkapi.model.chat;
//
//import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.UUID;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "Chat_User")
//public class ChatUser extends AbstractEntity {
//    @Column(name = "chat_id")
//    private UUID chatId;
//
//    @Column(name = "user_id")
//    private UUID userId;
//
//}
////TODO: Проверить связи, мне кажется что нужен @JoinColumn, но если его добавить то вылазят конфликты связанные с именами в колонках