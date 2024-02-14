package com.khit.media.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.khit.media.config.SecurityUser;

import lombok.RequiredArgsConstructor;

@RequestMapping("/chat")
@RequiredArgsConstructor
@Controller
public class ChatController {
	
	@GetMapping("/")
	public String chat(Model model, @AuthenticationPrincipal SecurityUser principal) {
		String name = principal.getMember().getName();
        model.addAttribute("name", name);
		return "chat/chat";
	}
}
