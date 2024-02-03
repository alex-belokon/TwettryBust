package com.socialnetwork.socialnetworkapi.config;

import com.socialnetwork.socialnetworkapi.SocialNetworkApiApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
              .allowedOrigins(SocialNetworkApiApplication.client_URI)
              .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
              .allowCredentials(true)
              .maxAge(3600);
    }
}