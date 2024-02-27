package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.CommunityMembersRepo;
import com.socialnetwork.socialnetworkapi.dao.repository.CommunityRepository;
import com.socialnetwork.socialnetworkapi.dao.service.CommunityService;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityCreateRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityRequest;
import com.socialnetwork.socialnetworkapi.dto.community.CommunityResponse;
import com.socialnetwork.socialnetworkapi.dto.community.MembershipRequest;
import com.socialnetwork.socialnetworkapi.mapper.Facade;
import com.socialnetwork.socialnetworkapi.model.communities.Community;
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
    private final Facade mapper;

    public DefaultCommunityService(CommunityRepository communityRepository, CommunityMembersRepo communityMembersRepo, Facade mapper) {
        this.communityRepository = communityRepository;
        this.communityMembersRepo = communityMembersRepo;
        this.mapper = mapper;
    }
    @Override
    public CommunityResponse createCommunity(CommunityCreateRequest req) {
        Community data = mapper.communityFromDTO(req);
        return mapper.communityToDTO(communityRepository.save(data));
    }

    @Override
    public Boolean deleteCommunity(UUID req) {
        try{
            communityRepository.deleteById(req);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public CommunityResponse getById(UUID req) {
        return this.toDtoFetched(req);
    }

    private CommunityResponse toDtoFetched(UUID req){
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
        Pageable pageable = PageRequest.of(req.getPage(), req.getPageSize() , Sort.by("createdAt").descending());
        return communityRepository.findAll(pageable).stream().map(community -> this.toDtoFetched(community.getId())).toList();
    }

    @Override
    public Boolean toggleMembership(MembershipRequest req) {
        if(communityMembersRepo.existsByUserIdAndCommunityId(req.getUserId(), req.getCommunityId())){
            communityMembersRepo.deleteByUserIdAndCommunityId(req.getUserId(), req.getCommunityId());
            return false;
        }else{
            communityMembersRepo.save(mapper.communityMemberFromDTO(req));
            return true;
        }
    }
}
