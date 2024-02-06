package com.socialnetwork.socialnetworkapi.dto;

import com.socialnetwork.socialnetworkapi.dto.user.UserAuthenticationResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Ответ с данными пользователя и токеном доступа")
public class JwtAuthenticationResponseWithUser {

    @Schema(description = "Данные пользователя")
    private UserAuthenticationResponse user;

    @Schema(description = "Токен доступа")
    private String token;
}
