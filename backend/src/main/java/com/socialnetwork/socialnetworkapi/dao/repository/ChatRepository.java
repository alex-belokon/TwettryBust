package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface ChatRepository extends JpaRepository<Chat, UUID> {
    @Query("SELECT c FROM Chat c WHERE c.user = :user") // not work
    List<Chat> findChatsByUser(@Param("user") Optional<User> user);

    @Query("SELECT c FROM Chat c WHERE c.id = :id AND c.user = :user") //Work
    Optional<Chat> findChatByIdAndUser(@Param("id") UUID id, @Param("user") User user);

    @Modifying
    @Query("DELETE FROM Chat c WHERE c.id = :id") //Work
    void deleteChatById(@Param("id") UUID id);


    @Query("SELECT m FROM Message m WHERE m.chatId IN (SELECT c.id FROM Chat c WHERE c.user = :user)") //Work
    List<Message> getLastMessagesInEachChat(@Param("user") User user, Pageable pageable);

    @Modifying
    @Query(value = "INSERT INTO Chats (user_id, creator_id) VALUES (:userId, :creatorId)", nativeQuery = true)
    void createChat(@Param("userId") UUID userId, @Param("creatorId") UUID creatorId);

    @Query("SELECT c FROM Chat c WHERE c.creator = :user")
    List<Chat> findChatsByCreator(@Param("user") Optional<User> user);

}
