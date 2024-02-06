package com.socialnetwork.socialnetworkapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Ответ c токеном доступа")
public class JwtRegistrationResponse {

    @Schema(description = "Токен доступа")
    private String token;
}