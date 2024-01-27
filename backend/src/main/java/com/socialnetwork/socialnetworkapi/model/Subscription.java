package com.socialnetwork.socialnetworkapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subscriptions")
public class Subscription extends AbstractEntity {

    @Column(name = "followerId", nullable = false)
    private UUID followerId;

    @Column(name = "followingId", nullable = false)
    private UUID followingId;
}
