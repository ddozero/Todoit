package com.todoit.intro.login;

import lombok.Data;

@Data
public class LoginRequestDTO {
	
	private String userId;
	private String password;
	
	//DB조회 암호화 비밀번호
	private String dbPassword;
	
	//결과
	private Integer result;
	private String message;
	private String name;

}
