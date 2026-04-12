package com.todoit.common.jwt;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
/* 기능
 * 26.04.12: API요청 들어올 때 클래스 실행, 요청 1번당 필터도 1번 실행 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private final JwtProvider jwtProvider;
	
	public JwtAuthenticationFilter(JwtProvider jwtProvider) {
		this.jwtProvider = jwtProvider;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
									HttpServletResponse response,
									FilterChain filterChain) throws ServletException,IOException{
		//클라이언트가 보낸 헤더이서 autorization 값을 꺼냄
		String bearerToken = request.getHeader("Authorization"); 
		
		//jwt보통 bearer 를 붙여 보냄. 진짜 토큰이 있는 요청인지 먼저 확인
		if(bearerToken !=null && bearerToken.startsWith("Bearer ")) {
			//bearer 는 7자라 잘라내고 진짜 토큰 문자열만 꺼냄(ex:Bearer abcdefg -> abcdefg)
			String token = bearerToken.substring(7);
			
			//토큰이 정상인지 검사
			if(jwtProvider.validateToken(token)) {
				//토큰에서 사용자 아이디 꺼내기
				String userId = jwtProvider.getUserId(token);
				//사용자에게 로그인 된 상태라고 알려줄 객체 만들기
				UsernamePasswordAuthenticationToken authentication =
						new UsernamePasswordAuthenticationToken(
								userId, 
								null, 
								List.of(new SimpleGrantedAuthority("ROLE_USER"))); //(권한고정 : role_user)
				//이걸 써야 spring security가 이요청은 인증된 사용자 요청이라고 인식
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		
		filterChain.doFilter(request, response);
	}

}
