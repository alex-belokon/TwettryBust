package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.model.chat.Chat;
import com.socialnetwork.socialnetworkapi.model.chat.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatRepository extends JpaRepository<Chat, UUID> {
    @Query("SELECT c FROM Chat c WHERE c.user = :user")
    List<Chat> findChatsByUser(@Param("user") Optional<User> user);

    @Query("SELECT c FROM Chat c WHERE c.id = :id AND c.user = :user")
    Optional<Chat> findChatByIdAndUser(@Param("id") UUID id, @Param("user") User user);

    @Modifying
    @Query("DELETE FROM Chat c WHERE c.id = :id")
    void deleteChatById(@Param("id") UUID id);

    @Query("SELECT m FROM Message m WHERE m.chatId = :chatId ORDER BY m.createdAt DESC")
    List<Message> findTopByChatIdOrderByDateDesc(@Param("chatId") UUID chatId, Pageable pageable);

    @Query("SELECT c FROM Chat c WHERE c.creator = :user")
    List<Chat> findChatsByCreator(@Param("user") Optional<User> user);

    boolean existsByUserAndCreator(User user1, User user2);

    Optional<Chat> findChatByUserAndCreator(User user1, User user2);
}
