package com.todoit.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable()) // 포스트맨 테스트 위해 csrf비활성
				.authorizeHttpRequests(auth -> auth.requestMatchers("/api/signup/**").permitAll() // 회원가입 허용, 누구나 접근 가능
						.anyRequest().authenticated()); //그 외는 로그인 필수
		
		return http.build();
	}

}
