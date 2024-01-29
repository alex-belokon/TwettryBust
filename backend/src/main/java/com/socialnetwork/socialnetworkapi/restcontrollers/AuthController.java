package com.socialnetwork.socialnetworkapi.restcontrollers;

import com.socialnetwork.socialnetworkapi.dao.UserService;
import com.socialnetwork.socialnetworkapi.dto.JwtAuthenticationResponse;
import com.socialnetwork.socialnetworkapi.dto.RegistrationRequest;
import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Аутентификация")
public class AuthController {
    private final AuthenticationService authenticationService;
    private final UserService userService; // для тестов, позже удалить

    public AuthController(AuthenticationService authenticationService, UserService userService1) {
        this.authenticationService = authenticationService;
        this.userService = userService1;
    }

    @Operation(summary = "Регистрация пользователя")
    @PostMapping("/sign-up")
    public JwtAuthenticationResponse signUp(@RequestBody @Valid RegistrationRequest request) throws RegistrationException {
        return authenticationService.signUp(request);
    }
    @Operation(summary = "Авторизация пользователя")
    @PostMapping("/sign-in")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid RegistrationRequest request) throws RegistrationException {
        return authenticationService.signIn(request);
    }
    @PostMapping("/registerManual")
    public ResponseEntity<String> registerUserManual(@RequestParam String username,
                                                     @RequestParam String password,
                                                     @RequestParam String email)  {
        try {
            userService.registerUserManual(username, password, email);
            return new ResponseEntity<>("user registered successfully", HttpStatus.OK);

        } catch (RegistrationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    //  Обработчик исключений, вызванных ошибками валидации входных параметров.
    //  Возвращает Map с информацией об ошибках, где ключ - это имя поля, а значение - сообщение об ошибке.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}

