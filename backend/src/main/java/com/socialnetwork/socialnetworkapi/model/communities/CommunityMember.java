package com.socialnetwork.socialnetworkapi.model.communities;

import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
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
@Table(name = "community_members")
public class CommunityMember extends AbstractEntity {
    @Column(name = "userId")
    private UUID userId;
    @Column(name = "communityId")
    private UUID communityId;
}
