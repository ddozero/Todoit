package com.todoit.intro.signup;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequestDTO {
	
	@NotBlank(message = "아이디는 필수입니다.")
	@Size(min=4, max =12, message = "아이디는 4~12자여야 합니다.")
	@Pattern(regexp = "^[a-zA-Z0-9]*$", message = "아이디는 영문과 숫자만 가능합니다.")
	private String userId;
	
	@NotBlank(message = "비밀번호 필수입니다.")
	@Size(min=4, max =12, message = "비밀번호는 8자 이상이어야 합니다.")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$", message = "비밀번호는 영문과 숫자를 포함해야 합니다.")
	private String password;
	
	@NotBlank(message = "이름은 필수입니다.")
	private String name;
	
	@NotBlank(message = "이메일은 필수입니다.")
	@Email(message = "올바른 이메일 형식이 아닙니다.")
	private String email;
	
	@NotBlank(message = "전화번호는 필수입니다.")
	private String phone;
	private Integer result;
	

}
