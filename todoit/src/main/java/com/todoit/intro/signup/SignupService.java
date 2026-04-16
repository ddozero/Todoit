package com.todoit.intro.signup;


public interface SignupService {
	int signupUser(SignupRequestDTO SignupRequestDTO);
	int checkUserId(SignupRequestDTO signupRequestDTO);

}
