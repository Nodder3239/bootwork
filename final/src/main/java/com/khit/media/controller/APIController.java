package com.khit.media.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class APIController {
	
	@GetMapping("/contact/emer_contact")
	public String emergencyContact() {
		return "contact/emer_contact";
	}
	
	
	@GetMapping("/public-data/main")
	public String dataMain() {
		return "/public-data/main";
	}
	
}
