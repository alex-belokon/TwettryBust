//package java.com.socialnetwork.socialnetworkapi.service;
//
//import com.socialnetwork.socialnetworkapi.dao.UserRepository;
//import com.socialnetwork.socialnetworkapi.model.User;
//import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.annotation.ComponentScan;
//
//
//import java.util.UUID;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@SpringBootTest
//@ComponentScan("com.socialnetwork.socialnetworkapi")
//public class DefaultUserServiceTest {
//
//    @Autowired
//    private DefaultUserService defaultUserService;
//
//    private User user;
//
//    @BeforeEach
//    public void init() {
//        user = new User();
//        user.setId(UUID.randomUUID());
//        user.setEmail("test@test");
//        user.setUserName("test");
//        user.setPassword("password");
//    }
//
//    @Test
//    public void whenCreateUser_thenSaveUserToDatabase() {
//        // given
//        User createdUser = defaultUserService.createUser(user);
//
//        // when
//        User foundUser = defaultUserService.getUserByEmail(user.getEmail());
//
//        // then
//        assertThat(foundUser).isNotNull();
//        assertThat(foundUser.getEmail()).isEqualTo(user.getEmail());
//        assertThat(foundUser.getUserName()).isEqualTo(user.getUserName());
//        assertThat(foundUser.getPassword()).isEqualTo(user.getPassword());
//    }
//}