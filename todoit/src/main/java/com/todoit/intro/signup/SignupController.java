package com.todoit.intro.signup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/signup")
@RequiredArgsConstructor //생성자 주입 방식 사용
public class SignupController {
	
	private final SignupService signupService;
	
	@PostMapping("/join")
	public ResponseEntity joinUser(@RequestBody SignupRequestDTO requestDTO) {
		int result = signupService.registerUser(requestDTO);
		
		if(result == 1) {
			return ResponseEntity.ok("SUCCESS");
		}else {
			return ResponseEntity.badRequest().body("FAIL");
		}
		
	}
	
}
