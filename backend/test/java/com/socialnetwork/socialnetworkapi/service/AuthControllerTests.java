package java.com.socialnetwork.socialnetworkapi.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.socialnetwork.socialnetworkapi.dao.UserService;
import com.socialnetwork.socialnetworkapi.dto.RegistrationRequest;
import com.socialnetwork.socialnetworkapi.exception.RegistrationException;
import com.socialnetwork.socialnetworkapi.model.User;
import com.socialnetwork.socialnetworkapi.restcontrollers.AuthController;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.validation.BeanPropertyBindingResult;

import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//TODO: Удалить тесты
@WebMvcTest(AuthController.class)
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class AuthControllerTests {

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testRegisterUser_Success() throws Exception {
        // Arrange
        RegistrationRequest registrationRequest = new RegistrationRequest("username", "password", "user@example.com");
        when(userService.createUser(any(RegistrationRequest.class))).thenReturn(new User());

        // Act
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationRequest)));

        // Assert
        result.andExpect(status().isOk())
                .andExpect(content().string("User registered successfully"));
        verify(userService, times(1)).createUser(registrationRequest);
    }

    @Test
    public void testRegisterUser_InvalidInput() throws Exception {
        // Arrange
        RegistrationRequest registrationRequest = new RegistrationRequest("", "", "invalid-email");

        // Act
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationRequest)));

        // Assert
        result.andExpect(status().isBadRequest());
    }
    @Test
    public void testCreateUser() throws RegistrationException {
        // экземпляр RegistrationRequest с данными
        RegistrationRequest registrationRequest = new RegistrationRequest("username", "password", "user@example.com");

        // экземпляр User, который будет возвращаться из createUser
        User mockUser = new User();
        mockUser.setId(UUID.randomUUID()); // Присвойте уникальный идентификатор
        mockUser.setUserName(registrationRequest.getUsername());
        mockUser.setEmail(registrationRequest.getEmail());

        // Мокируй метод createUser и укажите, что он должен возвращать mockUser
        when(userService.createUser(any(RegistrationRequest.class))).thenReturn(mockUser);

        // Тестовый код, где вызывается userService.createUser(registrationRequest)
        when(userService.createUser(any(RegistrationRequest.class))).thenReturn(mockUser);
    }
}
