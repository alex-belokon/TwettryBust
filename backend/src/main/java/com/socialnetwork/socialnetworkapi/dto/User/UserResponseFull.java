package com.socialnetwork.socialnetworkapi.dto.User;

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

// userData = {
//         banner: bannerUrl,
//         userScreensaver: "https://sitis.com.ua/upload/medialibrary/121/Programmist_1c.jpg",
//         name: "Name",
//         lastName: "User",
//         bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae totam sint, voluptatibus corporis quos debitis eaque cupiditate molestiae. Assumenda, ut.",
//         login: "@userName3333",
//         joiningDate: new Date,
//         location: "Ukraine",
//         birthDate: "22.10.13",
//         following: 2,
//         followers: 5,
//         website: "",
//         };
