package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.*;
import com.socialnetwork.socialnetworkapi.dao.service.CommunityService;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityCreateRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityResponse;
import com.socialnetwork.socialnetworkapi.dto.community.MembershipRequest;
import com.socialnetwork.socialnetworkapi.dto.community.RoleAssigmentRequest;
import com.socialnetwork.socialnetworkapi.exception.BadRequestException;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.communities.CommunityMember;
import com.socialnetwork.socialnetworkapi.model.communities.CommunityRole;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service @Transactional
@RequiredArgsConstructor
public class DefaultCommunityService implements CommunityService {

    private final CommunityRepository communityRepository;
    private final CommunityMembersRepository communityMembersRepository;
    private final PostRepository postRepository;
    private final LikesRepository likesRepository;
    private final FavoritesRepository favoritesRepository;
    private final Facade mapper;

    @Override
    public CommunityResponse createCommunity(CommunityCreateRequest req) {
        if (!communityRepository.existsByName(req.getName())) {
            CommunityResponse resp = mapper.communityToDTO(communityRepository.save(mapper.communityFromDTO(req)));
            communityMembersRepository.save(new CommunityMember(req.getCreatorId(), resp.getId(), CommunityRole.ADMINISTRATOR.name()));
            return resp;
        } else {
            throw new BadRequestException("Community with name " + req.getName() + " already exists");
        }
    }


    @Override
    public Boolean deleteCommunity(UUID requestedCommId, UUID userId) {
        if(Objects.equals(communityMembersRepository.getByCommunityIdAndUserId(requestedCommId, userId).getRole(), CommunityRole.ADMINISTRATOR.toString())){
            System.out.println("if passed successfully,");
            try {
                postRepository.getAllByCommunityId(requestedCommId).forEach(post -> {
                            likesRepository.deleteAllByPostId(post.getId());
                            favoritesRepository.deleteAllByPostId(post.getId());
                        }
                );
                postRepository.deleteAllByCommunityId(requestedCommId);
                communityMembersRepository.deleteAllByCommunityId(requestedCommId);
                communityRepository.deleteById(requestedCommId);
                return true;
            } catch (Exception e) {
                System.out.println(e);
                return false;
            }
        }
        return false;
    }

    @Override
    public CommunityResponse getById(UUID req) {
        return this.toDtoFetched(req);
    }

    private CommunityResponse toDtoFetched(UUID req) {
        CommunityResponse resp = mapper.communityToDTO(communityRepository.findById(req).orElseThrow());
        resp.setMembersCounts(communityMembersRepository.countAllByCommunityId(req));
        return resp;
    }

    @Override
    public String getAbout(UUID req) {
        return this.toDtoFetched(req).getAbout();
    }

    @Override
    public List<CommunityResponse> getPaged(CommunityRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getPageSize(), Sort.by("createdAt").descending());
        return communityRepository.findAll(pageable).stream().map(community -> this.toDtoFetched(community.getId())).toList();
    }

    @Override
    public Boolean toggleMembership(MembershipRequest req) {
        System.out.println(communityMembersRepository.existsByUserIdAndCommunityId(req.getUserId(), req.getCommunityId()));
        if (communityMembersRepository.existsByUserIdAndCommunityId(req.getUserId(), req.getCommunityId())) {
            communityMembersRepository.deleteByUserIdAndCommunityId(req.getUserId(), req.getCommunityId());
            return false;
        }
        communityMembersRepository.save(mapper.communityMemberFromDTO(req));
        return true;

    }

    @Override
    public Boolean assignRole(RoleAssigmentRequest req) {
        if (communityMembersRepository.findById(req.getAdminId()).get().getRole().equals(CommunityRole.ADMINISTRATOR.name())) {
            CommunityMember data = communityMembersRepository.getByCommunityIdAndUserId(req.getCommunityId(), req.getMemberId());
            data.setRole(CommunityRole.ADMINISTRATOR.name());
            communityMembersRepository.save(data);
            return true;
        } else {
            throw new BadRequestException("User with ID " + req.getAdminId() + " is not an admin in community with Id " + req.getCommunityId());
        }
    }
}
