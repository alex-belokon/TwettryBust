package com.socialnetwork.socialnetworkapi.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseFull {
    private UUID id;

    @NotBlank(message = "First name cannot be blank")
    private String  firstName;

    @NotBlank(message = "Last name cannot be blank")
    private String  lastName;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Email cannot be blank")
    private String  email;

    @NotBlank(message = "Date of birth cannot be blank")
    private String  dateOfBirth;

    @NotBlank(message = "Avatar URL cannot be blank")
    private String  avatar;

    @NotBlank(message = "Header photo URL cannot be blank")
    private String  headerPhoto;

    @NotBlank(message = "Username cannot be blank")
    private String  userName;

    @NotBlank(message = "Website cannot be blank")
    private String  website;

    @NotNull(message = "Creation date cannot be null")
    private LocalDateTime createdAt;

    @NotBlank(message = "Location cannot be blank")
    private String  location;

    @NotNull(message = "Followers count cannot be null")
    @Min(value = 0, message = "Followers count must be a non-negative number")
    private Integer followers;

    @NotNull(message = "Following count cannot be null")
    @Min(value = 0, message = "Following count must be a non-negative number")
    private Integer following;

    @NotBlank(message = "Bio cannot be blank")
    private String  bio;

    private Integer postsCount;

    private Boolean isFollowedByCurrent = false;
}
