package com.todoit.intro.signup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class SignupServiceImpl implements SignupService {
	
	@Autowired
	private SignupMapper signupMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public int signupUser(SignupRequestDTO SignupRequestDTO) {
		
		//26.04.05 비밀번호 암호화 처리 
		String encodedPassword = passwordEncoder.encode(SignupRequestDTO.getPassword());
		SignupRequestDTO.setPassword(encodedPassword);
		
		signupMapper.signupUser(SignupRequestDTO);
		return 1;
	}
}
