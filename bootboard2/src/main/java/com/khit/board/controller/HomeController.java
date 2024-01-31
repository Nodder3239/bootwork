package com.khit.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	/*
	@GetMapping("/")
	public String index() {
		return "/index";	//index.html
	}
	*/
	
	@GetMapping("/ex/game")
	public String game() {
		return "ex/game";
	}
}
