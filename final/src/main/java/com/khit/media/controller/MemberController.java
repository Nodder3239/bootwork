package com.khit.media.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import jakarta.servlet.http.HttpSession;

@RequestMapping("/member")
@Controller
public class MemberController {
	
	@GetMapping("/login")
	public String loginform() {
		return "/member/login";
	}
	
	@PostMapping("/login")
	public String login(HttpSession session, String name) {
		session.setAttribute("sessionId", name);
		session.setAttribute("sessionRole", "MEMBER");
		return "redirect:/";
	}
	
	@PostMapping("/login2")
	public String login2(HttpSession session, String name) {
		session.setAttribute("sessionId", name);
		session.setAttribute("sessionRole", "ADMIN");
		return "redirect:/";
	}
	
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
}
