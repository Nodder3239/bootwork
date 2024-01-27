package com.khit.board.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.khit.board.config.SecurityUser;
import com.khit.board.dto.BoardDTO;
import com.khit.board.entity.Board;
import com.khit.board.entity.Member;
import com.khit.board.service.BoardService;
import com.khit.board.service.MemberService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequestMapping("/board")
@RequiredArgsConstructor
@Controller
@Slf4j
public class BoardController {

	private final BoardService boardService;
	

	//글쓰기 페이지
	@GetMapping("/write")
	public String writeForm(Board board) {
		return "/board/write";
	}
	
	//글쓰기
	/*
	@PostMapping("/write")
	public String write(@Valid Board board) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    // Principal에서 사용자 정보를 얻어옵니다.
	    String memberId = authentication.getName();
	    Member member = memberService.findByMemberId(memberId);
	    board.setMember(member);
		//글쓰기 처리
		boardService.save(board);		
		return "redirect:/board/";
	}
	*/
	@PostMapping("/write")
	public String write(@ModelAttribute BoardDTO boardDTO, 
			@AuthenticationPrincipal SecurityUser principal) {
	
	    boardDTO.setMember(principal.getMember());
		//글쓰기 처리
		boardService.save(boardDTO);		
		return "redirect:/board/";
	}
	
	//글 목록 보기
	@GetMapping("/")
	public String getPageList(@PageableDefault(page=1) Pageable pageable, 
			Model model, @RequestParam(value="field", required = false) String field, 
			@RequestParam(value="kw", required = false) String kw) {
		Page<BoardDTO> boardList;
		if ("t".equals(field)) {
			boardList = boardService.findByTitle(kw, pageable);
		} else if ("c".equals(field)) {
			boardList = boardService.findByContent(kw, pageable);
		} else if ("w".equals(field)){
			boardList = boardService.findByMember(kw, pageable);
		}else {
			boardList = boardService.findListAll(pageable);
		}   
		//하단의 페이지 블럭 만들기
		int blockLimit = 10;	//하단에 보여줄 페이지 개수
		int startPage = ((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))-1) *blockLimit+1;
		int endPage = Math.min((startPage+blockLimit-1), boardList.getTotalPages());
		int nowPage = boardList.getNumber() + 1;
		if(endPage == 0) {
	         endPage = 1;
	      }
		
		model.addAttribute("boardList", boardList);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("field", field);
		model.addAttribute("kw", kw);
		return "/board/pagelist";
	}

	//글 상세보기
	@GetMapping("/{id}")
	public String getBoard(@PageableDefault(page=1) Pageable pageable, @PathVariable Long id, Model model) {
		//조회수
		boardService.updateHits(id);
		//글 상세보기
		BoardDTO boardDTO = boardService.findById(id);
		model.addAttribute("board", boardDTO);
		model.addAttribute("page", pageable.getPageNumber());
		return "/board/detail";
	}
	
	@GetMapping("/delete/{id}")
	public String deleteBoard(@PathVariable Long id) {
		boardService.deleteById(id);
		return "redirect:/board/";
	}
	
	@GetMapping("/update/{id}")
	public String updateForm(Model model, @PathVariable Long id) {
		boardService.updateHits2(id);
		BoardDTO boardDTO = boardService.findById(id);
		model.addAttribute("board", boardDTO);
		return "/board/boardupdate";
	}
	/*
	@PostMapping("/update")
	public String update(@ModelAttribute Board board) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    // Principal에서 사용자 정보를 얻어옵니다.
	    String memberId = authentication.getName(); // 사용자 아이디
	    Member member = memberService.findByMemberId(memberId);
	    board.setMember(member);
		boardService.update(board);
		return "redirect:/board/" + board.getId();
	}
	*/
	@PostMapping("/update")
	public String update(@ModelAttribute BoardDTO boardDTO, 
			@AuthenticationPrincipal SecurityUser principal) {
	
	    boardDTO.setMember(principal.getMember());
		//글쓰기 처리
		boardService.update(boardDTO);		
		return "redirect:/board/" + boardDTO.getId();
	}	
}
