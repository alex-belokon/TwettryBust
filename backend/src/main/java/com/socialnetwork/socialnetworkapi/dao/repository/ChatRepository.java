package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
@Repository
public interface ChatRepository extends JpaRepository<Chat, UUID> {
    @Query("SELECT c FROM Chat c WHERE c.user = :user") // Work
    List<Chat> findChatsByUser(@Param("user") User user);

    @Query("SELECT c FROM Chat c WHERE c.id = :id AND c.user = :user") //Work
    Optional<Chat> findChatByIdAndUser(@Param("id") UUID id, @Param("user") User user);

    @Modifying
    @Query("DELETE FROM Chat c WHERE c.id = :id") //Work
    Chat deleteChatById(@Param("id") UUID id);


    @Query("SELECT m FROM Message m WHERE m.chatId IN (SELECT c.id FROM Chat c WHERE c.user = :user)") //Work
    List<Message> getLastMessagesInEachChat(@Param("user") User user, Pageable pageable);

    @Modifying
    @Query("INSERT INTO Chat (user, creator) VALUES (:user, :creator)")
    void createChat(@Param("user") UUID userid, @Param("creator") UUID creatorId);

}
//TODO: quary чата юзера, id, chats которые связаны с ним
//TODO: quary на уделение чата, chatid
//TODO: quary создание чата
//TODO: Возвращение table с последними сообщениями