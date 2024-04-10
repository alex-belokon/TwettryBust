package com.socialnetwork.socialnetworkapi.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor @Setter @Getter
public class AuthorDTO {
    private UUID id;
    private String userName;
    private String avatar;
    private String firstName;
    private String lastName;
    private Integer followers;
    private Integer following;
}
