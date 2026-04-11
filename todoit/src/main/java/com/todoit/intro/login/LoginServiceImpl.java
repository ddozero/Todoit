package com.todoit.intro.login;

import org.springframework.stereotype.Service;

import com.todoit.common.exception.CustomException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

	private final LoginMapper loginMapper;

	@Override
	public LoginResponseDTO login(LoginRequestDTO requestDTO) {

		// 1. 프로시저 호출
		loginMapper.loginUser(requestDTO);

		// 2. 결과값 확인
		if (requestDTO.getResult() == null) {
		    throw new CustomException(500, "로그인 처리 중 오류가 발생하였습니다.");
		}

		// 3. 실패 처리 (DB에서 메시지 관리)
		if (requestDTO.getResult() != 1) {
			throw new CustomException(400, requestDTO.getMessage());
		}

		return new LoginResponseDTO(requestDTO.getUserId(), requestDTO.getName(), requestDTO.getMessage());
	}
}
