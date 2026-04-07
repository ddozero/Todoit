package com.todoit.intro;

import lombok.Data;

@Data
public class UserDTO {
	private String userNo; //유저고유번호
	private String userId; //아이디
	private String password; //비밀번호
	private String name; //이름
	private String phone; //전화번호
	private String email; //이메일
	private String createdAt; //가입일
	
	private int result; //프로시저 결과값(SP_RESULT)
	
}
