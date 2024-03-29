package com.socialnetwork.socialnetworkapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue", "/chat", "/hello", "/chat/{chatId}, /chat/{userId}, /topic/notifications");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/gs-guide-websocket").setAllowedOriginPatterns("*");
        registry.addEndpoint("/gs-guide-websocket/{chatId}").setAllowedOriginPatterns("*");
        registry.addEndpoint("/gs-guide-websocket/{userId}").setAllowedOriginPatterns("*");
        registry.addEndpoint("/gs-guide-websocket/topic/notifications").setAllowedOriginPatterns("*");
        registry.addEndpoint("/gs-guide-websocket/topic/notifications/{userId}").setAllowedOriginPatterns("*");
    }

}