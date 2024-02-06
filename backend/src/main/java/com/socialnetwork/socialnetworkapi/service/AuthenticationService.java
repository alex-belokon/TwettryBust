package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.*;
import com.socialnetwork.socialnetworkapi.dto.user.UserAuthenticationResponse;
import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.model.User;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;


@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationService {
    private final UserRepository userRepository;
    private final DefaultUserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private static final String USERNAME_ALREADY_TAKEN_MESSAGE = "Username is already taken";
    private static final String EMAIL_ALREADY_TAKEN_MESSAGE = "Email is already taken";

    /**
     * Регистрация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    public JwtRegistrationResponse signUp(RegistrationRequest request) throws RegistrationException {
        validate(request);
        var user = User.builder()
                .userName(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .accountActivated(true)
                .accountExpirationDate(LocalDate.now().plusDays(180)) // Например, срок действия учетной записи 30 дней
                .build();
        userService.createUser(user);
        var jwt = jwtService.generateToken(user);
        return new JwtRegistrationResponse(jwt);
    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    public JwtAuthenticationResponseWithUser signIn(SignInRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.getEmail());



        // Проверка, что срок действия учетной записи не истек
        if (LocalDate.now().isBefore(((User) user).getAccountExpirationDate())) {
            // Учетная запись не истекла, провести аутентификацию
            var jwt = jwtService.generateToken(user);
            var userData = new UserAuthenticationResponse(
                    ((User) user).getFirstName(),
                    ((User) user).getLastName(),
                    user.getUsername(),
                    ((User) user).getAvatar(),
                    ((User) user).getId()
            );
            return new JwtAuthenticationResponseWithUser(userData, jwt);
        } else {
            // Учетная запись истекла, обработать соответствующим образом
            throw new AccountExpiredException("Account has expired");
        }
    }


    private void validate(RegistrationRequest request) throws RegistrationException {
        if (StringUtils.isBlank(request.getUsername()) ||
                StringUtils.isBlank(request.getPassword()) ||
                StringUtils.isBlank(request.getEmail())) {
            throw new RegistrationException("All fields must be filled");
        }
        if (userRepository.existsByUserName(request.getUsername())) {
            throw new RegistrationException(USERNAME_ALREADY_TAKEN_MESSAGE);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RegistrationException(EMAIL_ALREADY_TAKEN_MESSAGE);
        }
    }

}