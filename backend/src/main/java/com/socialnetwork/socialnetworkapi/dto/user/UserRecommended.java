package com.socialnetwork.socialnetworkapi.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
public class UserRecommended {
    private UUID id;
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String avatar;
}
