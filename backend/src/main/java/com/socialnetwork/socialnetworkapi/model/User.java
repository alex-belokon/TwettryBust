package com.socialnetwork.socialnetworkapi.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@EqualsAndHashCode(callSuper = true)
@Entity
@Builder
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Users")
public class User extends AbstractEntity implements UserDetails {

    @Column(name = "first_Name")
    private String firstName;

    @Column(name = "last_Name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "address")
    private String address;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "header_photo")
    private String headerPhoto;

    @Column(name = "user_name", unique = true)
    private String userName;

    @Column(name = "Bio")
    private String bio;

    @Column(name = "Website")
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

    /**
     * Returns the authorities granted to the user. Cannot return <code>null</code>.
     *
     * @return the authorities, sorted by natural key (never <code>null</code>)
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>(); // null
    }

    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public boolean isAccountNonExpired() {
        return accountExpirationDate != null || LocalDate.now().isBefore(accountExpirationDate);
    }

    @Override
    public boolean isAccountNonLocked() {
        // Проверяем, что учетная запись не заблокирована
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return accountActivated;
    }

}
