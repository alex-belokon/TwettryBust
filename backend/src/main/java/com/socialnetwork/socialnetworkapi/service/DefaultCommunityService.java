package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.*;
import com.socialnetwork.socialnetworkapi.dao.service.CommunityService;
import com.socialnetwork.socialnetworkapi.dto.community.*;
import com.socialnetwork.socialnetworkapi.exception.BadRequestException;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.communities.Community;
import com.socialnetwork.socialnetworkapi.model.communities.CommunityMember;
import com.socialnetwork.socialnetworkapi.model.communities.CommunityRole;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultCommunityService implements CommunityService {
    private final CommunityRepository communityRepository;

    private final CommunityMembersRepo communityMembersRepo;
    private final PostRepository postRepository;
    private final LikesRepository likesRepository;
    private final FavoritesRepository favoritesRepository;
    private final Facade mapper;

    public DefaultCommunityService(CommunityRepository communityRepository, CommunityMembersRepo communityMembersRepo, PostRepository postRepository, LikesRepository likesRepository, FavoritesRepository favoritesRepository, Facade mapper) {
        this.communityRepository = communityRepository;
        this.communityMembersRepo = communityMembersRepo;
        this.postRepository = postRepository;
        this.likesRepository = likesRepository;
        this.favoritesRepository = favoritesRepository;
        this.mapper = mapper;
    }

    @Override
    public CommunityResponse createCommunity(CommunityCreateRequest req) {
        if(req.getCreatorId()==null) {
            throw new BadRequestException("NOT AUTHORIZED");
        }
        if (!communityRepository.existsByName(req.getName())) {
            CommunityResponse resp = mapper.communityToDTO(communityRepository.save(mapper.communityFromDTO(req)));
            communityMembersRepo.save(new CommunityMember(req.getCreatorId(), resp.getId(), CommunityRole.ADMINISTRATOR.name()));
            return resp;
        } else {
            throw new BadRequestException("Community with name " + req.getName() + " already exists");
        }
    }


    @Override
    public Boolean deleteCommunity(UUID req, UUID userId) {
        if(communityMembersRepo.findById(userId).orElseThrow().getRole().equals(CommunityRole.ADMINISTRATOR.name())){
            throw new BadRequestException("USER IS NOT ADMIN");
        }
        try {
            postRepository.getAllByCommunityId(req).forEach(post -> {
                        likesRepository.deleteAllByPostId(post.getId());
                        favoritesRepository.deleteAllByPostId(post.getId());
                    }
            );
            postRepository.deleteAllByCommunityId(req);
            communityMembersRepo.deleteAllByCommunityId(req);
            communityRepository.deleteById(req);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public CommunityResponse getById(UUID req) {
        return this.toDtoFetched(req);
    }

    private CommunityResponse toDtoFetched(UUID req) {
        CommunityResponse resp = mapper.communityToDTO(communityRepository.findById(req).orElseThrow());
        resp.setMembersCounts(communityMembersRepo.countAllByCommunityId(req));
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
        System.out.println(communityMembersRepo.existsByUserIdAndCommunityId(req.getUserId(), req.getCommunityId()));
        if (communityMembersRepo.existsByUserIdAndCommunityId(req.getUserId(), req.getCommunityId())) {
            communityMembersRepo.deleteByUserIdAndCommunityId(req.getUserId(), req.getCommunityId());
            return false;
        }
        communityMembersRepo.save(mapper.communityMemberFromDTO(req));
        return true;

    }

    @Override
    public Boolean assignRole(RoleAssigmentRequest req) {

        if(communityMembersRepo.findById(req.getAdminId()).orElseThrow().getRole().equals(CommunityRole.ADMINISTRATOR.name())){
            CommunityMember data = communityMembersRepo.getByCommunityIdAndUserId(req.getCommunityId(), req.getMemberId());

            data.setRole(CommunityRole.ADMINISTRATOR.name());
            communityMembersRepo.save(data);
            return true;
        }else{
            throw new BadRequestException("User with ID " + req.getAdminId()+" is not an admin in community with Id "+ req.getCommunityId());
        }
    }
}
