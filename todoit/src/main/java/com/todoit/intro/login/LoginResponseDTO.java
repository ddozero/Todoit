package com.todoit.intro.login;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
* 기록 
* 26.04.10 : db에서 조회한 userDTO 그대로 반환시 필요없는 정보까지 나감, 그래서 응답용 객체를 따로 만드는게 좋음
* 26.04.12 : JWT 토큰 추가
*/

@Getter
@AllArgsConstructor
public class LoginResponseDTO {
	
	private String userId;
	private String name;
	private String message;
	private String token;

}
