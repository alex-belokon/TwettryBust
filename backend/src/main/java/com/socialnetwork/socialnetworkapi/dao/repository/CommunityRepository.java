package com.socialnetwork.socialnetworkapi.dao.repository;

import com.socialnetwork.socialnetworkapi.model.communities.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommunityRepository extends JpaRepository<Community, UUID> {
    void deleteById(UUID id);

    Boolean existsByName(String name);
}
