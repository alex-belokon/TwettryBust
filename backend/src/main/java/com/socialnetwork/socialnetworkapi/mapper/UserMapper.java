package com.socialnetwork.socialnetworkapi.mapper;

import com.socialnetwork.socialnetworkapi.dto.user.UserResponseFull;
import com.socialnetwork.socialnetworkapi.dto.user.UserResponseShort;
import com.socialnetwork.socialnetworkapi.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserMapper {
    private ModelMapper mapper;

    public UserResponseFull toFullResponse(User ent){
        return Objects.isNull(ent)? null : mapper.map(ent, UserResponseFull.class);
    }
    public UserResponseShort toShortResponse(User ent){
        return Objects.isNull(ent)? null : mapper.map(ent, UserResponseShort.class);
    }
}
