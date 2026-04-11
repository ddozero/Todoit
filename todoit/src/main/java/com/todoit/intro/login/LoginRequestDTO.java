package com.todoit.intro.login;

import lombok.Data;

@Data
public class LoginRequestDTO {
	
	private String userId;
	private String password;
	
	//결과
	private Integer result;
	private String message;
	private String name;

}
