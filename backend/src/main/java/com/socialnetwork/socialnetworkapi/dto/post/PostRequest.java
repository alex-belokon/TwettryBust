package com.socialnetwork.socialnetworkapi.dto.post;

import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class PostRequest extends AbstractEntity {
    @NotBlank
    UUID userId;
    @NotBlank
    String content;
    String attachment;
    @NotBlank
    String type;
    @org.hibernate.validator.constraints.UUID
    UUID originalPostId;
}
