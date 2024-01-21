package com.socialnetwork.socialnetworkapi.config;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.util.logging.Logger;

@Slf4j
@EnableWebSecurity
@Configuration
public class SecurityConfig {
    private static final Logger logger = Logger.getLogger(SecurityConfig.class.getName());
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    @Bean
    public UserDetailsService userDetailsService() {
        User.UserBuilder users = User.builder().passwordEncoder(passwordEncoder::encode);

        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(users.username("user").password("password").roles("USER").build()); //TODO: Удалить после релиза
        manager.createUser(users.username("1").password("1").roles("USER", "ADMIN").build());

        logger.warning("User password: " + users.username("user").password("password").roles("USER").build().getPassword()); //TODO: Удалить после релиза
        logger.warning("Admin password: " + users.username("admin").password("password").roles("USER", "ADMIN").build().getPassword());
        return manager;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorization -> authorization
                                .requestMatchers("/login", "/token", "/css/**", "/js/**", "/registration", "/new", "http://localhost:9000/h2-console" ).permitAll()
                                .anyRequest().permitAll()
                );
        return http.build();
    }
}
