package com.socialnetwork.socialnetworkapi.dto.jwt;

import com.socialnetwork.socialnetworkapi.dto.user.UserAuthenticationResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Ответ c данными пользователя и токеном доступа")
public class JwtAuthenticationResponse {

    @Schema(description = "Токен доступа")
    private String token;

    @Schema
    private UserAuthenticationResponse user;
}