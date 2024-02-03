package com.socialnetwork.socialnetworkapi.config;


import com.socialnetwork.socialnetworkapi.SocialNetworkApiApplication;
import com.socialnetwork.socialnetworkapi.jwt.JwtAuthenticationFilter;
import com.socialnetwork.socialnetworkapi.service.DefaultUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.logging.Logger;

@Slf4j
@EnableWebSecurity
@Configuration
public class SecurityConfig {
    private static final String DEFAULT_PASSWORD = "password";
    private static final Logger logger = Logger.getLogger(SecurityConfig.class.getName());
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final DefaultUserService userService;

    public SecurityConfig(PasswordEncoder passwordEncoder, JwtAuthenticationFilter jwtAuthenticationFilter, DefaultUserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userService = userService;
    }
    @Bean
    public UserDetailsService userDetailsService() {
        User.UserBuilder users = User.builder().passwordEncoder(passwordEncoder::encode);
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();

        //profile for user
        manager.createUser(User.withUsername("user").password(DEFAULT_PASSWORD).roles("USER").build());
        //profile for admin
        manager.createUser(User.withUsername("1").password(DEFAULT_PASSWORD).roles("USER", "ADMIN").build());

        logger.warning("user password: " + users.username("user").password(DEFAULT_PASSWORD).roles("USER").build().getPassword()); // Удалить перед релизом
        logger.warning("Admin password: " + users.username("admin").password(DEFAULT_PASSWORD).roles("USER", "ADMIN").build().getPassword());
        return manager;
    }
    //попробовать избавится от try,catch
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        int tokenValiditySeconds = 86400;  // 24h/7d default
        http
                .cors().and()
                .csrf().disable().httpBasic().disable()
                .headers()// Если не отключать, будут проблемы с H2, нужно настроить
                    .frameOptions().disable()
                    .and()
                .authorizeHttpRequests(authorization -> {
                    try {
                        authorization
                                .requestMatchers("/**" ).permitAll()
                                .and()
                                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider())
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
                    } catch (Exception e) {
                        throw new SecurityException("An error occurred while configuring security.", e);
                        }
                    }
                )
                 .rememberMe()
                    .tokenValiditySeconds(tokenValiditySeconds)
                .and()
                .exceptionHandling()
                    .accessDeniedPage("/403");
        return http.build();
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService.userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * тонкі налаштування корс фільтра який був активований у filterChain (64 рядок)
     * @return the associated {@link CorsConfiguration}, or {@code null} if none
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(SocialNetworkApiApplication.client_URI));
        config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);

        return source;
    }
}
