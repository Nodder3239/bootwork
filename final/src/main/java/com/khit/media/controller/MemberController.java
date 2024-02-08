package com.khit.media.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.khit.media.config.SecurityUser;
import com.khit.media.dto.BoardDTO;
import com.khit.media.dto.MemberDTO;
import com.khit.media.dto.ReplyDTO;
import com.khit.media.entity.Member;
import com.khit.media.service.BoardService;
import com.khit.media.service.MemberService;
import com.khit.media.service.ReplyService;
import com.khit.media.service.ReportService;
import com.khit.media.service.VoteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class MemberController {
	
	private final MemberService memberService;
	private final BoardService boardService;
	private final ReplyService replyService;
	private final VoteService voteService;
	private final ReportService reportService;
	
    //로그인 페이지 요청 :  /login
	@GetMapping("/login")
	public String loginForm() {
		return "login";  //login.html
	}
	
	//메인 페이지
	@GetMapping("/main")
	public String main() {
		return "main";  //main.html
	}
	
	//회원 가입 페이지
	@GetMapping("/member/join")
	public String joinForm(MemberDTO memberDTO) {
		return "member/join";
	}
	
	@PostMapping("/member/join")
	public String join(@Valid MemberDTO memberDTO,
			BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			//에러가 있으면 회원 가입 페이지에 머무름
			return "member/join";
		}
		
		memberService.save(memberDTO);
		return "redirect:/login";
	}
	
	//회원 목록
	@GetMapping("/member/list")
	public String getList(Model model) {
		List<MemberDTO> memberDTOList = memberService.findAll();
		model.addAttribute("memberList", memberDTOList);
		return "member/list";
	}
	
	//회원 상세 보기
	@GetMapping("/member/{id}")
	public String getMember(@PathVariable Integer id,
			Model model) {
		MemberDTO memberDTO = memberService.findById(id);
		model.addAttribute("member", memberDTO);
		return "member/detail";
	}
	
	//회원 삭제
	@GetMapping("/member/delete/{id}")
	public String deleteMember(@PathVariable Integer id) {
		memberService.deleteById(id);
		MemberDTO memberDTO = memberService.findById(id);
		String name = memberDTO.getName();
		boardService.deleteByBoardWriter(name);
		replyService.deleteByReplyer(name);
		voteService.deleteByVoter(name);
		reportService.deleteByReporter(name);
		return "redirect:/member/list";
	}
	
	//회원 수정 페이지
	@GetMapping("/member/update")
	public String updateMemberForm(
			@AuthenticationPrincipal SecurityUser principal,
			Model model) {
		MemberDTO memberDTO = memberService.findByMemberId(principal);
		model.addAttribute("member", memberDTO);
		return "member/update";
	}
	
	//회원 수정 처리 - 상세보기로 이동
	@PostMapping("/member/update")
	public String update(@ModelAttribute MemberDTO memberDTO) {
		memberService.update(memberDTO);
		return "redirect:/member/" + memberDTO.getId();
	}
	@GetMapping("/member/account")
	public String account(
			@AuthenticationPrincipal SecurityUser principal,
			@PageableDefault(page=1) Pageable pageable, Model model) {
		Page<BoardDTO> voteList = boardService.findVoteListAll3(principal.getMember().getName(), pageable);
		Page<BoardDTO> myboardList = boardService.findByWriter3(principal.getMember().getName() ,pageable);
		Page<ReplyDTO> myReplyList = replyService.findByReplyer3(principal.getMember().getName(), pageable);
		
		model.addAttribute("voteList", voteList);
		model.addAttribute("myBoardList", myboardList);
		model.addAttribute("myReplyList", myReplyList);
		
		return "member/account";
	}
}