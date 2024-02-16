package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.FavoritesRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.LikesRepository;
import com.socialnetwork.socialnetworkapi.dto.favAndLikes.FavoriteToggleRequest;
import com.socialnetwork.socialnetworkapi.dto.favAndLikes.LikeRequest;
import com.socialnetwork.socialnetworkapi.model.Favorite;
import com.socialnetwork.socialnetworkapi.model.Like;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FavsAndLikesService {
    FavoritesRepository favsRepo;
    LikesRepository likesRepo;

    public FavsAndLikesService(FavoritesRepository repo, LikesRepository repo1){
        this.favsRepo = repo;
        this.likesRepo = repo1;
    }
    public Boolean toggleFavorite(FavoriteToggleRequest req){
        Favorite fav = favsRepo.getByUserIdAndPostId(req.getUserId(), req.getPostId());
        if(fav == null){
            fav = new Favorite(req.getUserId(), req.getPostId());
            favsRepo.save(fav);
            return true;
        }else{
            favsRepo.delete(fav);
            return false;
        }
    }
    public Integer getPostLikesCount(UUID reqId){
        return likesRepo.countAllByPostId(reqId);
    }

    public boolean toggleLike(LikeRequest req){
        Like like = likesRepo.getByUserIdAndPostId(req.getUserId(), req.getPostId());
        if (like == null){
            like = new Like(req.getUserId(), req.getPostId());
            likesRepo.save(like);
            return true;
        }else {
            likesRepo.delete(like);
            return false;
        }
    }
}
