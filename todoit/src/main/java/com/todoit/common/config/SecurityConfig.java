package com.todoit.common.config;

import com.todoit.TodoitApplication;
import com.todoit.common.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final TodoitApplication todoitApplication;

    SecurityConfig(TodoitApplication todoitApplication, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.todoitApplication = todoitApplication;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable()) // 포스트맨 테스트 위해 csrf비활성
				  .formLogin(form -> form.disable())
				  .httpBasic(httpBasic -> httpBasic.disable())
				  .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //세션 안씀
				  .authorizeHttpRequests(auth -> auth
						.requestMatchers("/api/auth/**").permitAll() // 회원가입 로그인 허용, 누구나 접근 가능
						.anyRequest().authenticated()) //나머지 api는 jwt있어야 접근 가능
				/*
				 * //(핵심) 요청 들어오면 
				 * 1) jwt필터 먼저 실행
				 * 2) 토큰 있으면 인증 처리
				 * 3) 그다음 컨트롤러로 감
				 */
			      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
			      
		
		return http.build();
	}

}
