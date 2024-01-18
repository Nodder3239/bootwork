package com.khit.board.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.khit.board.dto.BoardDTO;
import com.khit.board.entity.Board;
import com.khit.board.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequestMapping("/userboard")
@Slf4j
@RequiredArgsConstructor
@Controller
public class UserBoardController {

	private final BoardService boardService;
	
	//글쓰기 페이지
	@GetMapping("/write")
	public String writeForm(BoardDTO boardDTO) {
		return "/userboard/write";
	}
	
	//글쓰기
	@PostMapping("/write")
	public String write(@Valid BoardDTO boardDTO, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {		//에러가 있으면 글쓰기 폼으로 이동
			return "/userboard/write";
		}
		//글쓰기 처리
		boardService.save(boardDTO);
		return "redirect:/userboard/";
	}
	
	//글 목록 보기
	@GetMapping("/list")
	public String getBoardList(@RequestParam(value="page", defaultValue="0") int page, Model model, String field, String kw) {
		List<BoardDTO> boardList = boardService.findAll();
		       
		model.addAttribute("boardList", boardList);
		//List<Board> boardList = boardService.findAll();
		model.addAttribute("field", field);
		model.addAttribute("kw", kw);
		model.addAttribute("page", page);
		return "/userboard/list";
	}
	
	/*
	@GetMapping("/")
	public String getPageList(@PageableDefault(page=1) Pageable pageable, Model model) {
		Page<BoardDTO> boardList = boardService.findListAll(pageable);
		
		//하단의 페이지 블럭 만들기
		int blockLimit = 10;	//하단에 보여줄 페이지 개수
		int startPage = ((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))-1) *blockLimit+1;
		int endPage = Math.min((startPage+blockLimit-1), boardList.getTotalPages());
		int nowPage = boardList.getNumber() + 1;
		
		model.addAttribute("boardList", boardList);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		model.addAttribute("nowPage", nowPage);
		return "/board/pagelist";
	}
	*/
	@GetMapping("/")
	public String getPageList(@PageableDefault(page=1) Pageable pageable, Model model, String field, String kw) {
		String c = "userboard";
		Page<BoardDTO> boardList;
		if ("t".equals(field)) {
			boardList = boardService.findByTitle(kw, pageable, c);
		} else if ("c".equals(field)) {
			boardList = boardService.findByContent(kw, pageable, c);
		} else if ("w".equals(field)){
			boardList = boardService.findByWriter(kw, pageable, c);
		}else {
			boardList = boardService.findListAll(pageable, c);
		}   
		//하단의 페이지 블럭 만들기
		int blockLimit = 10;	//하단에 보여줄 페이지 개수
		int startPage = ((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))-1) *blockLimit+1;
		int endPage = Math.min((startPage+blockLimit-1), boardList.getTotalPages());
		int nowPage = boardList.getNumber() + 1;
		
		model.addAttribute("boardList", boardList);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		model.addAttribute("nowPage", nowPage);
		return "/userboard/pagelist";
	}
	
	
	
	//글 상세보기
	@GetMapping("/{id}")
	public String getBoard(@PathVariable Long id, Model model) {
		//조회수
		boardService.updateHits(id);
		//글 상세보기
		BoardDTO boardDTO = boardService.findById(id);
		model.addAttribute("board", boardDTO);
		return "/userboard/detail";
	}
	
	@GetMapping("/delete/{id}")
	public String deleteBoard(@PathVariable Long id) {
		boardService.delete(id);
		return "redirect:/userboard/";
	}
	
	@GetMapping("/update/{id}")
	public String updateForm(Model model, @PathVariable Long id) {
		boardService.updateHits2(id);
		BoardDTO boardDTO = boardService.findById(id);
		model.addAttribute("board", boardDTO);
		return "/userboard/boardupdate";
	}
	
	@PostMapping("/update")
	public String update(@ModelAttribute BoardDTO boardDTO) {
		boardService.update(boardDTO);
		return "redirect:/userboard/" + boardDTO.getId();
	}
		
}
