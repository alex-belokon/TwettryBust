package com.socialnetwork.socialnetworkapi.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseFull {
    private String  firstName;
    private String  lastName;
    private String  email;
    private String  dateOfBirth;
    private String  avatar;
    private String  headerPhoto;
    private String  userName;
    private String  website;
    private Date    createdAt;
    private String  location;
    private Integer followers;
    private Integer following;
    private String  bio;
}
