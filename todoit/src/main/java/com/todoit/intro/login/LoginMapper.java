package com.todoit.intro.login;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface LoginMapper {
	void loginUser(LoginRequestDTO requestDTO);
}
