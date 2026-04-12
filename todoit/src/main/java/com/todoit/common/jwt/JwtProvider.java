package com.todoit.common.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtProvider {

	private final SecretKey secretKey;
	private final long expiration;

	public JwtProvider(@Value("${jwt.secret}") String secret, 
			           @Value("${jwt.expiration}") long expiration) {

		// jwt 서명용 key객체로 바꿈
		this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		this.expiration = expiration;
	}

	// 사용자 아이디를 받아 jwt만듬
	public String createToken(String userId) {
		Date now = new Date(); // 토큰 발급 시간
		Date expiryDate = new Date(now.getTime() + expiration); // 토큰 만료 시간 ex)expiration이 1시간이면 지금시간+1시간 뒤까지 유효

		return Jwts.builder(). //jwt만들기 시작
			   subject(userId). //토큰 주인은 userId
			   issuedAt(now). //언제 발급 했는지
			   expiration(expiryDate). //언제 만료 되는지
			   signWith(secretKey). //(중요)우리 서버가 만든 진짜 토큰인지 증명하는 서명
			   compact(); //최종 jwt문자열 완성
	}
	
	/* 토큰 검증 메소드 */ 
	//토큰 안에 사용자 아이디 꺼내기 메소드
	public String getUserId(String token) {
		return getClaims(token).getSubject();
		
	}
	
	//토큰이 정상인지 확인 메소드
	public boolean validateToken(String token) {
		try {
			getClaims(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	//토큰을 실제로 해석해 안에 있는 정보를 꺼내는 메소드
	private Claims getClaims(String token) {
		return Jwts.parser()
			   .verifyWith(secretKey)
			   .build()
			   .parseSignedClaims(token)
			   .getPayload();
		}
}
