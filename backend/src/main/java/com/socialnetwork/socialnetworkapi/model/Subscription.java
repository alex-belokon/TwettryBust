package com.socialnetwork.socialnetworkapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subscriptions")
public class Subscription extends AbstractEntity {

    @Column(name = "followerId", nullable = false)
    private UUID followerId;

    @Column(name = "followingId", nullable = false)
    private UUID followingId;
}
