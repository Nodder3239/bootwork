package com.khit.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/auth")
@Controller
public class AuthController {
	@GetMapping("/main")
	public String authMain() {
		return "/auth/main";
	}
	@GetMapping("/accessDenied")
	public String accessDenied() {
		return "/auth/accessDenied";
	}	
}
