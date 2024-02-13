package com.socialnetwork.socialnetworkapi.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FollowRequest {
    @NotBlank (message="uid1 mustnt be blank")  UUID uid1;
    @NotBlank (message="uid2 mustnt be blank")  UUID uid2;
}
