package com.khit.media.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.khit.media.config.SecurityUser;
import com.khit.media.dto.MemberDTO;
import com.khit.media.service.MemberService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/chat")
@RequiredArgsConstructor
@Controller
public class ChatController {
	private final MemberService memberService;
	
	@GetMapping("/")
	public String chat(Model model, @AuthenticationPrincipal SecurityUser principal) {
		MemberDTO memberDTO = memberService.findById(principal.getMember().getId());
        model.addAttribute("member", memberDTO);
		return "chat/chat";
	}
}
