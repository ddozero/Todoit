package com.todoit.intro.login;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todoit.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {

	private final LoginService loginService;

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<LoginResponseDTO>> login(@RequestBody LoginRequestDTO requestDTO) {
		LoginResponseDTO responseDTO = loginService.login(requestDTO);

		return ResponseEntity.ok(new ApiResponse<>(200, "로그인성공", responseDTO));
	}
}
