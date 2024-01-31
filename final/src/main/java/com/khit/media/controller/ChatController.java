package com.khit.media.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequestMapping("/chat")
@RequiredArgsConstructor
@Controller
public class ChatController {
	
	@GetMapping("/")
	public String chat(Model model, HttpSession session) {
		String id = (String) session.getAttribute("sessionId");
        model.addAttribute("chatname", id);
		return "chat/chat";
	}
}
