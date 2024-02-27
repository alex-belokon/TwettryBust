package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.communities.CommunityMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface CommunityMembersRepo extends JpaRepository<CommunityMember, UUID>  {
    Integer countAllByCommunityId(UUID cid);
    Boolean existsByUserIdAndCommunityId(UUID userId, UUID communityId);
    void deleteByUserIdAndCommunityId(UUID userId, UUID communityId);
}
