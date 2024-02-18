package com.socialnetwork.socialnetworkapi.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Getter
@Setter
public class UserRequest {
    private String userName;
    private String firstName;
    private String lastName;
    private String bio;
    private String address;
    private String website;
    private String location;
    private String avatar;
    private LocalDate dateOfBirth;
    private String email;
    private String headerPhoto;

}
