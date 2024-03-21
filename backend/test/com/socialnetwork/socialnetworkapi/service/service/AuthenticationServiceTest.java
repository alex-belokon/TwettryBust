package com.socialnetwork.socialnetworkapi.service.service;

import com.socialnetwork.socialnetworkapi.dao.repository.UserRepository;
import com.socialnetwork.socialnetworkapi.dto.RegistrationRequest;
import com.socialnetwork.socialnetworkapi.dto.SignInRequest;
import com.socialnetwork.socialnetworkapi.dto.jwt.JwtAuthenticationResponseWithUser;
import com.socialnetwork.socialnetworkapi.dto.jwt.JwtRegistrationResponse;
import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.service.AuthenticationService;
import com.socialnetwork.socialnetworkapi.service.DefaultEmailService;
import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
import com.socialnetwork.socialnetworkapi.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.UUID;

@Slf4j
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private DefaultUserService userService;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private DefaultEmailService emailService;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void signUp_SuccessfulRegistration_ReturnsJwtResponse() throws RegistrationException {
        // Arrange
        RegistrationRequest request = new RegistrationRequest("username", "password", "email");
        String token = "fakeToken";
        when(userRepository.existsByUserName(request.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(jwtService.generateToken(any(User.class))).thenReturn(token);

        // Act
        JwtRegistrationResponse response = authenticationService.signUp(request);

        // Assert
        assertNotNull(response);
        assertTrue(response.getToken().contains(token));
        assertTrue(response.getToken().contains("Registration successful"));
        verify(userService).createUser(any(User.class));
        verify(emailService).sendAccountConfirmationEmail(eq("email"), anyString());
    }

    @Test
    void signUp_UsernameAlreadyTaken_ThrowsRegistrationException() {
        // Arrange
        RegistrationRequest request = new RegistrationRequest("username", "password", "email");
        when(userRepository.existsByUserName(request.getUsername())).thenReturn(true);

        // Act & Assert
        log.info(String.valueOf(assertThrows(RegistrationException.class, () -> authenticationService.signUp(request))));
    }

    @Test
    void signUp_EmailAlreadyTaken_ThrowsRegistrationException() {
        // Arrange
        RegistrationRequest request = new RegistrationRequest("username", "password", "email");
        when(userRepository.existsByUserName(request.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);

        // Act & Assert
        assertThrows(RegistrationException.class, () -> authenticationService.signUp(request));
    }

    @Test
    void signIn_ExpiredAccount_ThrowsAccountExpiredException() {
        // Arrange
        SignInRequest request = new SignInRequest();
        request.setPassword("password");
        request.setEmail("email");
        User user = new User();
        user.setAccountExpirationDate(LocalDate.now().minusDays(1));
        when(userService.loadUserByUsername(request.getEmail())).thenReturn(user);

        // Mock AuthenticationManager to throw AccountExpiredException
        when(authenticationManager.authenticate(any())).thenThrow(new AccountExpiredException("Account has expired"));

        // Act & Assert
        assertThrows(AccountExpiredException.class, () -> authenticationService.signIn(request));
    }
}
