package com.socialnetwork.socialnetworkapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "favorites")
public class Favorite extends AbstractEntity{
    @Column(name = "userId")
    private UUID userId;

    @Column(name = "postId")
    private UUID postId;
}
