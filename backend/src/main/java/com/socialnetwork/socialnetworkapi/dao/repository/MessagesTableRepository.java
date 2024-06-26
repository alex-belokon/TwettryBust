package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.chat.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessagesTableRepository extends JpaRepository<Message, UUID> {
    @Query("SELECT m FROM Message m WHERE m.chatId = :chatId ORDER BY m.createdAt DESC")
    List<Message> findLastMessagesInChat(@Param("chatId") UUID chatId, Pageable pageable);

    List<Message> findByContentContaining(String keyword);

    long countByChatId(UUID chatId);

    void deleteByChatId(UUID chatId);

    List<Message> findByChatId(UUID chatId);

    List<Message> findBySenderId(UUID senderId);

    @Modifying
    @Query("UPDATE Message m SET m.read = true WHERE m.chatId = :chatId AND m.sender.id = :userId")
    void markAllMessagesInChatAsReadByUser(UUID chatId, UUID userId);
}
