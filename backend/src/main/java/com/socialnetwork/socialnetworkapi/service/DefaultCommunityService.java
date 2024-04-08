package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.*;
import com.socialnetwork.socialnetworkapi.dao.service.CommunityService;
import com.socialnetwork.socialnetworkapi.dto.community.*;
import com.socialnetwork.socialnetworkapi.exception.BadRequestException;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.communities.Community;
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

@Service
@Transactional
@RequiredArgsConstructor
public class DefaultCommunityService implements CommunityService {

    private final CommunityRepository communityRepository;
    private final CommunityMembersRepository communityMembersRepository;
    private final PostRepository postRepository;
    private final LikesRepository likesRepository;
    private final FavoritesRepository favoritesRepository;
    private final Facade mapper;

    @Override
    public CommunityResponseFull createCommunity(CommunityCreateRequest req) {
        if (!communityRepository.existsByName(req.getName())) {
            Community ent = mapper.communityFromDTO(req);
            ent.setOwnerId(req.getCreatorId());
            UUID communityId = communityRepository.save(ent).getId();
            communityMembersRepository.save(new CommunityMember(req.getCreatorId(), communityId, CommunityRole.ADMINISTRATOR.name()));
            return this.toFullDtoCurrentUserFetched(communityId, req.getCreatorId());
        } else {
            throw new BadRequestException("Community with name " + req.getName() + " already exists");
        }
    }


    @Override
    public Boolean deleteCommunity(UUID requestedCommId, UUID userId) {
        if (Objects.equals(communityMembersRepository.getByCommunityIdAndUserId(requestedCommId, userId).getRole(), CommunityRole.ADMINISTRATOR.toString())) {
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
    public CommunityResponse getById(UUID req, UUID currentUserId) {
        return this.toDtoCurrentUserFetched(req, currentUserId);
    }

    private CommunityResponse toDtoFetched(UUID req) {
        CommunityResponse resp = mapper.communityToDTO(communityRepository.findById(req).orElseThrow());
        resp.setMembersCounts(communityMembersRepository.countAllByCommunityId(req));
        return resp;
    }

    private CommunityResponse toDtoCurrentUserFetched(UUID req, UUID currentUserId) {
        CommunityResponse resp = this.toDtoFetched(req);
        resp.setFollowed(communityMembersRepository.existsByUserIdAndCommunityId(currentUserId, req));
        return resp;
    }
    private CommunityResponseFull toFullDtoCurrentUserFetched(UUID req, UUID currentUserId){
        CommunityResponseFull resp = mapper.communityToFullDTO(communityRepository.findById(req).orElseThrow());
        resp.setMembersCounts(communityMembersRepository.countAllByCommunityId(req));
        resp.setFollowed(communityMembersRepository.existsByUserIdAndCommunityId(currentUserId, req));

        return resp;
    }

    @Override
    public String getAbout(UUID req) {
        return this.toDtoFetched(req).getAbout();
    }

    @Override
    public List<CommunityResponseFull> getPaged(CommunityRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getPageSize(), Sort.by("createdAt").descending());
        return communityRepository.findAll(pageable).stream().map(community -> this.toFullDtoCurrentUserFetched(community.getId(), req.getUserId())).toList();
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
    public List<CommunityResponse> getAllByMemberId(UUID userId, Integer page){
        return page == null
                ? communityMembersRepository.getAllByUserId(userId).stream().map(communityMember -> this.toDtoCurrentUserFetched(communityMember.getCommunityId(), userId)).toList()
                : communityMembersRepository.findAllByUserId(userId, PageRequest.of(page, 10, Sort.by("createdAt").descending())).stream().map(communityMember -> this.toDtoCurrentUserFetched(communityMember.getCommunityId(), userId)).toList();
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
