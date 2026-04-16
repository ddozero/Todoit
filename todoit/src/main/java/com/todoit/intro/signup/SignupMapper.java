package com.todoit.intro.signup;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface SignupMapper {
	void signupUser(SignupRequestDTO signupRequestDTO);
	void checkUserId(SignupRequestDTO signupRequestDTO);

}
