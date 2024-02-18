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
    @NotBlank(message = "First name cannot be blank")
    private String  firstName;

    @NotBlank(message = "Last name cannot be blank")
    private String  lastName;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Email cannot be blank")
    private String  email;

    @NotBlank(message = "Avatar URL cannot be blank")
    private String  avatar;

    @NotBlank(message = "Bio cannot be blank")
    private String  bio;

    @NotNull(message = "ID cannot be null")
    private UUID    id;

    private boolean isFollowing;
}