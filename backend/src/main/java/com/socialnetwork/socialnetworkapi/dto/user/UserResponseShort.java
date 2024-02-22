package com.socialnetwork.socialnetworkapi.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseShort {

    private String userName;

    private String  firstName;

    private String  lastName;

    private String  email;

    private String  avatar;

    private UUID    id;

    private Boolean isFollowing;

    private Boolean isFollowed;

}