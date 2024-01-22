package com.socialnetwork.socialnetworkapi.config;


import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.util.logging.Logger;

@Slf4j
@EnableWebSecurity
@Configuration
public class SecurityConfig {
    private static final String DEFAULT_PASSWORD = "password";
    private static final Logger logger = Logger.getLogger(SecurityConfig.class.getName());
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    @Bean
    public UserDetailsService userDetailsService() {
        User.UserBuilder users = User.builder().passwordEncoder(passwordEncoder::encode);
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();

        //profile for user
        manager.createUser(User.withUsername("user").password(DEFAULT_PASSWORD).roles("USER").build());
        //profile for admin
        manager.createUser(User.withUsername("1").password(DEFAULT_PASSWORD).roles("USER", "ADMIN").build());

        logger.warning("User password: " + users.username("user").password(DEFAULT_PASSWORD).roles("USER").build().getPassword()); // Удалить перед релизом
        logger.warning("Admin password: " + users.username("admin").password(DEFAULT_PASSWORD).roles("USER", "ADMIN").build().getPassword());
        return manager;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .cors().disable()
                .authorizeHttpRequests(authorization -> authorization
                                .requestMatchers("/login", "/token", "/css/**", "/js/**", "/registration", "/new", "http://localhost:9000/h2-console" ).permitAll()
                                .anyRequest().permitAll()
                );
    return http.build();
    }
}
