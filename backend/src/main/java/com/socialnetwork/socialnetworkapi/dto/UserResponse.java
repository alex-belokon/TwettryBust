package com.socialnetwork.socialnetworkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String dateOfBirth;
    private String address;
    private String avatar;
    private String headerPhoto;
    private String userName;
}
