package com.socialnetwork.socialnetworkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    private UUID    id;
    private String  firstName;
    private String  lastName;
    private String  email;
    private String  dateOfBirth;
    private String  address;
    private String  avatar;
    private String  headerPhoto;
    private String  userName;
    private Integer followers;
    private Integer following;
}
