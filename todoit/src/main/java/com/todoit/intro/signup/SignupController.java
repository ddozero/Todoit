package com.todoit.intro.signup;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todoit.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/signup")
@RequiredArgsConstructor // 생성자 주입 방식 사용
public class SignupController {

	private final SignupService signupService;

	@PostMapping("/join")
	public ResponseEntity<ApiResponse<?>> joinUser(@RequestBody SignupRequestDTO requestDTO) {
		int result = signupService.signupUser(requestDTO);

		if (result == 1) {
			return ResponseEntity.ok(new ApiResponse<>(200, "회원가입성공", null));
		} else {
			return ResponseEntity.badRequest().body(new ApiResponse<>(400, "회원가입실패", null));
		}

	}

}
