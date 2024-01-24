package com.khit.board.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.khit.board.config.SecurityUser;
import com.khit.board.entity.Member;
import com.khit.board.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RequestMapping("/member")
@Slf4j
@RequiredArgsConstructor
@Controller
public class MemberController {
	
	private final MemberService memberService;

	@GetMapping("/join")
	public String joinForm() {
		return "/member/join";
	}
	
	@PostMapping("/join")
	public String join(@ModelAttribute Member member) {
		//회원 가입 처리(저장)
		memberService.insert(member);
		return "redirect:/member/login";
	}
	
	@GetMapping("/")
	public String getList(Model model) {
		//memberDTO로 반환할 것
		List<Member> memberList = memberService.findAll();
		model.addAttribute("memberList", memberList);
		return "/member/list";
	}
	
	
	@GetMapping("/login")
	public String loginForm() {
		return "/member/login";
	}
	/*
	@PostMapping("/login")
	public String login(@ModelAttribute Member member, HttpSession session, Model model) {
		Member loginMember = memberService.login(member);
	
		//로그인 성공, 실패
		if(loginMember !=null && loginMember.getPassword().equals(member.getPassword())) {
			//session.setAttribute("sessionId", loginMember.getMemberId());
			//session.setAttribute("sessionName", loginMember.getName());
			return "/index";	//http://localhost:8080/
		}else {
			String error = "아이디나 비밀번호를 확인해 주세요";
			model.addAttribute("error", error);
			return "/member/login";
		}
	}
	*/
	//회원 상세보기
	@GetMapping("/{id}")
	public String getMember(@PathVariable Long id, Model model) {
		Member member = memberService.findById(id);
		model.addAttribute("member", member);
		return "/member/detail";
	}
	
	//회원 삭제
	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Long id) {
		memberService.delete(id);
		return "redirect:/member/";
	}
	
	@GetMapping("/update/{id}")
	public String updateForm(@PathVariable Long id, Model model) {
		Member member = memberService.findById(id);
		model.addAttribute("member", member);
		return "/member/update";
	}
	/*
	@GetMapping("/update")
	public String updateForm2(Model model) throws Exception {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    // Principal에서 사용자 정보를 얻어옵니다.
	    String memberId = authentication.getName(); // 사용자 아이디
	    Member member = memberService.findByMemberId(memberId);

	    model.addAttribute("member", member);
	    return "/member/update";
	}
	*/
	
	//@AuthenticationPrincipal - 회원을 인가하는 클래스	
	@GetMapping("/update")
	public String updateForm2(@AuthenticationPrincipal SecurityUser principal, Model model) {
	    // Principal에서 사용자 정보를 얻어옵니다.
	    Member member = memberService.findByMemberId(principal);
	    model.addAttribute("member", member);
	    return "/member/update";
	}
	
	
	@PostMapping("/update")
	public String update(@ModelAttribute Member member) {
		memberService.update(member);
		return "redirect:/member/" + member.getId();
	}
	
	//아이디 중복 검사
	@PostMapping("/checkId")
	public @ResponseBody String checkEmail(@RequestParam String memberId) {
		String checkResult = memberService.checkId(memberId);
		return checkResult;
	}
	//로그아웃
	/*
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
	*/
	@GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // Spring Security에서 제공하는 LogoutHandler 및 LogoutSuccessHandler를 사용
        LogoutHandler logoutHandler = new SecurityContextLogoutHandler();
        LogoutSuccessHandler logoutSuccessHandler = (httpServletRequest, httpServletResponse, authentication) -> {
            // 로그아웃 성공 후의 처리를 수행
            SecurityContextHolder.clearContext(); // 현재 스레드의 SecurityContext를 제거
        };

        logoutHandler.logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        logoutSuccessHandler.onLogoutSuccess(request, response, SecurityContextHolder.getContext().getAuthentication());

        return "redirect:/";
    }
}
