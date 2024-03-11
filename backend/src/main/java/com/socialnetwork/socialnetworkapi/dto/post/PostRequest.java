package com.socialnetwork.socialnetworkapi.dto.post;

import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostRequest extends AbstractEntity {

    UUID userId;

    String content;

    String attachment;

    @NotBlank
    String type;

    @org.hibernate.validator.constraints.UUID
    UUID originalPostId;

    UUID communityId;
}
