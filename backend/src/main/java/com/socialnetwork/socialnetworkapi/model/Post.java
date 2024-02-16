package com.socialnetwork.socialnetworkapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "posts")
public class Post extends AbstractEntity{
    @Column(name = "userId")
    UUID userId;
    @Column(name = "content")
    String content;
    @Column(name = "attachment")
    String attachment;
    @Column(name = "type")
    String type;
    @Column(name = "originalPostId")
    UUID originalPostId;
    
    @Override 
    public String toString() {
        return String.format("Post ID %s, created at %s, original postId %s", this.getId(), this.getCreatedAt(), this.getOriginalPostId());
    }

}
