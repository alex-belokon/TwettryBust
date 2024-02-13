package com.socialnetwork.socialnetworkapi.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor @Setter @Getter
public class AuthorDTO {
    private String username;
    private String avatar;
    private String firstName;
    private String lastName;
}
