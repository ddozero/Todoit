package com.todoit.intro.login;

import org.apache.ibatis.annotations.Mapper;

import com.todoit.intro.UserDTO;

@Mapper
public interface LoginMapper {
	UserDTO loginUser(LoginRequestDTO requestDTO);
}
