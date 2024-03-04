package com.socialnetwork.socialnetworkapi.dto.comment;


import jakarta.persistence.Column;

import java.util.UUID;

public class CommentDTO {
    private UUID UserId;
    private String userName;
    private String firstName;
    private String lastName;
    private String avatar;
    private String content;
    private String attachment;

    public CommentDTO(UUID userId, String userName, String firstName, String lastName, String avatar, String content, String attachment) {
        UserId = userId;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.content = content;
        this.attachment = attachment;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public UUID getUserId() {
        return UserId;
    }

    public void setUserId(UUID userId) {
        UserId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

}


