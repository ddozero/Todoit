package com.todoit.intro.login;

import org.springframework.stereotype.Service;

import com.todoit.common.exception.CustomException;
import com.todoit.common.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

	private final LoginMapper loginMapper;
	//jwt생성기 가져옴
	private final JwtProvider jwtProvider;

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
		
		//4. 로그인 성공 시 jwt 생성 
		//로그인 성공한 사용자 아이디를 넣고 jwt문자열 하나 생성
		String token = jwtProvider.createToken(requestDTO.getUserId());

		return new LoginResponseDTO(requestDTO.getUserId(), requestDTO.getName(), requestDTO.getMessage(), token);
	}
}
