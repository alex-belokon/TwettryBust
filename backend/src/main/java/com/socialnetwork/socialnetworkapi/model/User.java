package com.socialnetwork.socialnetworkapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User extends AbstractEntity{
    @NotBlank @Column(name = "firstName", nullable = false)            private String  firstName;
    @NotBlank @Column(name = "lastName", nullable = false)             private String  lastName;
    @NotBlank @Email @Column(name = "email", nullable = false)         private String  email;
    @NotBlank @JsonIgnore @Column(name = "password", nullable = false) private String  password;
    @NotBlank @Column(name = "dateOfBirth", nullable = false)          private Integer dateOfBirth;
    @NotBlank @Column(name = "address", nullable = false)              private String  address;
    @Column(name = "avatar", nullable = false)                         private String  avatar;
    @Column(name = "headerPhoto", nullable = false)                    private String  headerPhoto;
    @NotBlank @Column(name = "userName", nullable = false)             private String  userName;

//    @ManyToOne
//    @JoinColumn(name = "user")
//    private List<User> users;
}
