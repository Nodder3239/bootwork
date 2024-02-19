package com.khit.media.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
			BindingResult bindingResult,
			MultipartFile memberFile
			) throws Exception{
		if(bindingResult.hasErrors()) {
			log.info("has errors.....");
			//에러가 있으면 회원 가입 페이지에 머무름
			return "member/join";
		}
		
		memberService.save(memberDTO, memberFile);
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
		MemberDTO memberDTO = memberService.findById(id);
		String name = memberDTO.getName();
		reportService.deleteByReporter(name);
		voteService.deleteByVoter(name);
		replyService.deleteByReplyer(name);
		boardService.deleteByBoardWriter(name);
		memberService.deleteById(id);
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
	public String update(@ModelAttribute MemberDTO memberDTO, MultipartFile memberFile) throws Exception {
		memberService.update(memberDTO, memberFile);
		return "redirect:/member/account";
	}
	
	//회원 마이페이지
	@GetMapping("/member/account")
	public String account(
			@AuthenticationPrincipal SecurityUser principal,
	        @PageableDefault(page=1) Pageable pageable,
	        Model model) {
		MemberDTO memberDTO = memberService.findById(principal.getMember().getId());
		String name = memberDTO.getName();
		Page<BoardDTO> voteList = boardService.findVoteListAll2(name, pageable);
	    Page<BoardDTO> myBoardList = boardService.findByWriter2(name, pageable);
	    Page<ReplyDTO> myReplyList = replyService.findByReplyer2(name, pageable);
	    
	    model.addAttribute("member", memberDTO);
	    model.addAttribute("name", name);
	    model.addAttribute("voteList", voteList);
	    model.addAttribute("myBoardList", myBoardList);
	    model.addAttribute("myReplyList", myReplyList);
		
		return "member/account";
	}
	
	//회원탈퇴
	@GetMapping("/member/out")
	public String signOut(
			@AuthenticationPrincipal SecurityUser principal,
			HttpServletRequest request, 
			HttpServletResponse response) throws Exception {
		LogoutHandler logoutHandler = new SecurityContextLogoutHandler();
        LogoutSuccessHandler logoutSuccessHandler = (httpServletRequest, httpServletResponse, authentication) -> {
            // 로그아웃 성공 후의 처리를 수행
            SecurityContextHolder.clearContext(); // 현재 스레드의 SecurityContext를 제거
        };

        logoutHandler.logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        logoutSuccessHandler.onLogoutSuccess(request, response, SecurityContextHolder.getContext().getAuthentication());

		String name = principal.getMember().getName();
		reportService.deleteByReporter(name);
		voteService.deleteByVoter(name);
		replyService.deleteByReplyer(name);
		boardService.deleteByBoardWriter(name);
		memberService.deleteById(principal.getMember().getId());
		return "redirect:/";
	}
	
	//이메일 중복 검사
	@PostMapping("/member/check-email")
	public @ResponseBody String checkEmail(
			@RequestParam("memberEmail") String memberEmail) {
		String resultText = memberService.checkEmail(memberEmail);
		return resultText;
	}
	
}