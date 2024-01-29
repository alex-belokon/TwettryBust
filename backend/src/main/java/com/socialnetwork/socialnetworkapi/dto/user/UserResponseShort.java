package com.socialnetwork.socialnetworkapi.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseShort {
    private String  firstName;
    private String  lastName;
    private String  email;
    private String  avatar;
    private String  bio;
    private UUID    id;
    private boolean isFollowing;
}