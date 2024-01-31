package com.khit.media.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.khit.media.entity.Member;
import com.khit.media.service.BoardService;
import com.khit.media.service.MemberService;
import com.khit.media.service.ReplyService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequestMapping("/member")
@RequiredArgsConstructor
@Controller
public class MemberController {
	
	private final MemberService memberService;
	private final BoardService boardService;
	
	
	@GetMapping("/login")
	public String loginform() {
		return "member/login";
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
	
	//회원 삭제
	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Long id) {
		memberService.delete(id);
		Member member = memberService.findById(id);
		boardService.deleteByBoardWriter(member.getMemberName());
		return "redirect:/";
	}
}
