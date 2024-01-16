package com.khit.board.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.khit.board.dto.MemberDTO;
import com.khit.board.entity.Member;
import com.khit.board.service.MemberService;

import jakarta.servlet.http.HttpSession;
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
	public String join(@ModelAttribute MemberDTO memberDTO) {
		log.info("memberDTO=" + memberDTO);
		//회원 가입 처리(저장)
		memberService.insert(memberDTO);
		return "redirect:/member/login";
	}
	
	@GetMapping("/")
	public String getList(Model model) {
		//memberDTO로 반환할 것
		List<MemberDTO> memberList = memberService.findAll();
		model.addAttribute("memberList", memberList);
		return "/member/list";
	}
	
	@GetMapping("/login")
	public String loginForm() {
		return "/member/login";
	}
	
	@PostMapping("/login")
	public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session, Model model) {
		MemberDTO loginMember = memberService.login(memberDTO);
		
		
		//Member loginMember = memberService.login(memberDTO);
		//로그인 성공, 실패
		if(loginMember !=null) {
			session.setAttribute("sessionEmail", loginMember.getMemberEmail());
			session.setAttribute("sessionName", loginMember.getMemberName());
			return "/index";	//http://localhost:8080/
		}else {
			String error = "아이디나 비밀번호를 확인해 주세요";
			model.addAttribute("error", error);
			return "/member/login";
		}
	}
	
	//회원 상세보기
	@GetMapping("/{id}")
	public String getMember(@PathVariable Long id, Model model) {
		MemberDTO memberDTO = memberService.findById(id);
		model.addAttribute("member", memberDTO);
		return "member/detail";
	}
	
	//회원 삭제
	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Long id) {
		memberService.delete(id);
		return "redirect:/member/";
	}
	
	@GetMapping("/update/{id}")
	public String updateForm(@PathVariable Long id, Model model) {
		MemberDTO memberDTO = memberService.findById(id);
		model.addAttribute("member", memberDTO);
		return "/member/update";
	}
	
	@GetMapping("/update")
	public String updateForm2(HttpSession session, Model model) {
		String email = (String) session.getAttribute("sessionEmail");
		MemberDTO memberDTO = memberService.findByMemberEmail(email);
		model.addAttribute("member", memberDTO);
		return "/member/update";
	}
	
	@PostMapping("/update")
	public String update(@ModelAttribute MemberDTO memberDTO) {
		memberService.update(memberDTO);
		return "redirect:/member/" + memberDTO.getId();
	}
	
	//아이디 중복 검사
	@PostMapping("/checkemail")
	public @ResponseBody String checkEmail(@RequestParam String memberEmail) {
		log.info(memberEmail);
		String checkResult = memberService.checkEmail(memberEmail);
		return checkResult;
	}
	//로그아웃
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
}
