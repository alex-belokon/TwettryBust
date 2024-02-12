package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.FavoritesRepository;
import com.socialnetwork.socialnetworkapi.dto.favorite.FavoriteToggleRequest;
import com.socialnetwork.socialnetworkapi.model.Favorite;
import org.springframework.stereotype.Service;

@Service
public class FavoritesService {
    FavoritesRepository repo;
    public FavoritesService(FavoritesRepository repo){
        this.repo = repo;
    }
    public Boolean toggleFavorite(FavoriteToggleRequest req){
        Favorite fav = repo.getByUserIdAndPostId(req.getUserId(), req.getPostId());
        if(fav == null){
            fav = new Favorite(req.getUserId(), req.getPostId());
            repo.save(fav);
            return true;
        }else{
            repo.delete(fav);
            return false;
        }
    }
}
