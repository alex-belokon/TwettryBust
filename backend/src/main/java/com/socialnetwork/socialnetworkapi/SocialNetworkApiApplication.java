package com.socialnetwork.socialnetworkapi;


import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SocialNetworkApiApplication implements ApplicationRunner {
	private static final Logger logger = LoggerFactory.getLogger(SocialNetworkApiApplication.class);

	public static final String client_URI = "http://localhost:5173";

	public static void main(String[] args) {
		SpringApplication.run(SocialNetworkApiApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args)  {
		logger.info("http://localhost:9000/swagger-ui/index.html");
		logger.info("http://localhost:9000/h2-console");
	}

	//bean для работы с паролями, то есть, хеширование
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
