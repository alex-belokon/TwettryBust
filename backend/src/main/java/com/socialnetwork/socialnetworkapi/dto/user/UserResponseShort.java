package com.socialnetwork.socialnetworkapi.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseShort {
    private String  firstName;
    private String  lastName;
    private String  email;
    private String  avatar;
    private String  bio;
    private UUID    id;
}


//         Для списку користувачів:
//         {
//           name: "Jane",
//           lastName: "Smith",
//           login: "@jane.smith",
//           userScreensaver: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663690/cld-sample.jpg',
//           isFollows: false,
//           bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis repellat, aliquid quae impedit, voluptatum, recusandae aliquamLorem ipsum dolor sit amet',
//           id: 3,
//         },