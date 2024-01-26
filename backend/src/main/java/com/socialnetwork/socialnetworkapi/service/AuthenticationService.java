package com.socialnetwork.socialnetworkapi.service;

import com.socialnetwork.socialnetworkapi.dao.UserRepository;
import com.socialnetwork.socialnetworkapi.dao.UserService;
import com.socialnetwork.socialnetworkapi.dto.JwtAuthenticationResponse;
import com.socialnetwork.socialnetworkapi.dto.RegistrationRequest;
import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.model.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
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
    public JwtAuthenticationResponse signUp(@Valid RegistrationRequest request) throws RegistrationException {
        validate(request);

        var user = User.builder()
                .userName(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        var jwt = jwtService.generateToken(userService.createUser(user));
        return new JwtAuthenticationResponse(jwt);
    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    public JwtAuthenticationResponse signIn(@Valid RegistrationRequest request) throws RegistrationException {
        validate(request);

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.getUsername());

        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(jwt);
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
        if (userRepository.existsByEmail(request.getUsername())) {
            throw new RegistrationException(EMAIL_ALREADY_TAKEN_MESSAGE);
        }
    }
}