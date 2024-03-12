package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.repository.FavoritesRepository;
import com.socialnetwork.socialnetworkapi.dao.repository.LikesRepository;
import com.socialnetwork.socialnetworkapi.dto.favAndLikes.FavoriteToggleRequest;
import com.socialnetwork.socialnetworkapi.dto.favAndLikes.LikeRequest;
import com.socialnetwork.socialnetworkapi.model.Favorite;
import com.socialnetwork.socialnetworkapi.model.Like;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FavoritesAndLikesService {
    private final FavoritesRepository favoritesRepository;
    private final LikesRepository likesRepository;

    public Boolean toggleFavorite(FavoriteToggleRequest req) {
        Favorite fav = favoritesRepository.getByUserIdAndPostId(req.getUserId(), req.getPostId());
        if (fav == null) {
            fav = new Favorite(req.getUserId(), req.getPostId());
            favoritesRepository.save(fav);
            return true;
        } else {
            favoritesRepository.delete(fav);
            return false;
        }
    }

    public Integer getPostLikesCount(UUID reqId) {
        return likesRepository.countAllByPostId(reqId);
    }

    public boolean toggleLike(LikeRequest req) {
        Like like = likesRepository.getByUserIdAndPostId(req.getUserId(), req.getPostId());
        if (like == null) {
            like = new Like(req.getUserId(), req.getPostId());
            likesRepository.save(like);
            return true;
        } else {
            likesRepository.delete(like);
            return false;
        }
    }
}
