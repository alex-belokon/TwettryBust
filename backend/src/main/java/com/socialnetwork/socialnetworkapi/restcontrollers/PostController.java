package com.socialnetwork.socialnetworkapi.restcontrollers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @Slf4j
@RequestMapping("/api/posts")
@Tag(name = "PostController")
public class PostController {
}
