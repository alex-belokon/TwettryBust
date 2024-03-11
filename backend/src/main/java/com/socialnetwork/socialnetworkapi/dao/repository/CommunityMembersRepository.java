package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.communities.CommunityMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface CommunityMembersRepository extends JpaRepository<CommunityMember, UUID> {
    Integer countAllByCommunityId(UUID cid);

    Boolean existsByUserIdAndCommunityId(UUID userId, UUID communityId);

    @Transactional
    void deleteByUserIdAndCommunityId(UUID userId, UUID communityId);

    CommunityMember getByCommunityIdAndUserId(UUID cid, UUID userId);

    void deleteAllByCommunityId(UUID cid);
}
