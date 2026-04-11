package com.todoit.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.todoit.common.response.ApiResponse;

@RestControllerAdvice
public class GlovalExceptionHandler {

	@ExceptionHandler(CustomException.class)
	public ResponseEntity<ApiResponse<?>> handleCsutomException(CustomException e) {

		ApiResponse<?> response = new ApiResponse<>(e.getCode(), e.getMessage(), null);
		
		return ResponseEntity.badRequest().body(response);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<?>> handleException(Exception e){
		ApiResponse<?> response = new ApiResponse<>(500, e.toString(), null);
		
		return ResponseEntity.internalServerError().body(response);
	}

}
