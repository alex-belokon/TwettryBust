package com.socialnetwork.socialnetworkapi.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    @NotBlank(message = "First name cannot be blank")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    private String lastName;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @NotBlank(message = "Date of birth cannot be blank")
    private String dateOfBirth;

    @NotBlank(message = "Address cannot be blank")
    private String address;

    @NotBlank(message = "Avatar URL cannot be blank")
    private String avatar;

    @NotBlank(message = "Header photo URL cannot be blank")
    private String headerPhoto;

    @NotBlank(message = "Username cannot be blank")
    private String userName;

    @NotBlank(message = "Password cannot be blank")
    private String password;
}
