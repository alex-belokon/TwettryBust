package com.socialnetwork.socialnetworkapi.dto.comment;

import java.util.UUID;

public class CommentDTO {
    private UUID userId;
    private String text;

    // Конструктори
    public CommentDTO() {
    }

    public CommentDTO(UUID userId, String text) {
        this.userId = userId;
        this.text = text;
    }

    // Геттери та сеттери
    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    // toString(), hashCode() і equals() методи можуть бути додані за необхідності
}


