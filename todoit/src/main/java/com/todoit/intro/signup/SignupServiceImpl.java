package com.todoit.intro.signup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SignupServiceImpl implements SignupService {
	
	@Autowired
	private SignupMapper signupMapper;
	
	@Override
	public int registerUser(SignupRequestDTO SignupRequestDTO) {
		signupMapper.signupUser(SignupRequestDTO);
		return 1;
	}
}
