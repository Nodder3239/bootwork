package com.khit.board.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice		//예외처리 역할을 하는 클래스
@RestController
public class BootBoardExceptionHandler {
	
	@ExceptionHandler(value = Exception.class)
	public String globalExceptionHandler(Exception e) {
		return "<h2>" + e.getMessage() + "</h2>";
	}
	

}
