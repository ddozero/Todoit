package com.todoit.test;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test/me")
    public String me(Authentication authentication) {
        return "현재 로그인 사용자: " + authentication.getName();
    }
}