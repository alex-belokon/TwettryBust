package com.socialnetwork.socialnetworkapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
    public class User extends AbstractEntity implements UserDetails{
    @NotBlank
    @Column(name = "firstName", nullable = false)
    private String firstName;

    @NotBlank
    @Column(name = "lastName", nullable = false)
    private String lastName;

    @NotBlank
    @Email
    @Column(name = "email",unique = true, nullable = false)
    private String email;

    @NotBlank
    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @NotBlank
    @Column(name = "dateOfBirth", nullable = false)
    private LocalDate dateOfBirth;

    @NotBlank
    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "avatar", nullable = false)
    private String avatar;

    @Column(name = "headerPhoto", nullable = false)
    private String headerPhoto;

    @NotBlank
    @Column(name = "userName", nullable = false)
    private String userName;

    @Column(name = "Bio", nullable = false)
    private String bio;

    @Column(name = "Website", nullable = false)
    private String website;

    @Column(name = "account_activated")
    private boolean accountActivated;

    @Column(name = "credentials_expiration_date")
    private LocalDate credentialsExpirationDate;

    @Column(name = "account_locked")
    private boolean accountLocked;

    @Column(name = "account_expiration_date")
    private LocalDate accountExpirationDate;

    @Column(name = "location")
    private String location;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Возвращаем пустую коллекцию ролей, так как они не используются
        return Collections.emptyList();
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Проверяем, что срок действия учетной записи не истек
        return LocalDate.now().isBefore(accountExpirationDate);
    }

    @Override
    public boolean isAccountNonLocked() {
        // Проверяем, что учетная запись не заблокирована
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Проверяем, что срок действия учетных данных не истек
        return LocalDate.now().isBefore(credentialsExpirationDate);
    }

    @Override
    public boolean isEnabled() {
        // Проверяем, что учетная запись активирована
        return accountActivated;
    }
}