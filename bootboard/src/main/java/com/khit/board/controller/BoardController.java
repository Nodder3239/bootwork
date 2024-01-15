package com.khit.board.controller;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.khit.board.entity.Board;
import com.khit.board.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequestMapping("/board")
@Slf4j
@RequiredArgsConstructor
@Controller
public class BoardController {

	private final BoardService boardService;
	
	//글쓰기 페이지
	@GetMapping("/write")
	public String writeForm() {
		return "/board/write";
	}
	
	//글쓰기
	@PostMapping("/write")
	public String write(@ModelAttribute Board board) {
		boardService.save(board);
		return "redirect:/board/";
	}
	
	//글 목록 보기
	@GetMapping("/")
	public String getBoardList(@RequestParam(value="page", defaultValue="0") int page, Model model, String field, String kw) {
	  
		Page<Board> boardList;
			if ("t".equals(field)) {
				boardList = boardService.findByTitle(kw, page);
			} else if ("c".equals(field)) {
				boardList = boardService.findByContent(kw, page);
			} else if ("w".equals(field)){
				boardList = boardService.findByWriter(kw, page);
			}else {
				boardList = boardService.findAll(page);
		       
		}
		model.addAttribute("boardList", boardList);
		//List<Board> boardList = boardService.findAll();
		model.addAttribute("field", field);
		model.addAttribute("kw", kw);
		model.addAttribute("page", page);
		return "/board/list";
	}
	
	
	//글 상세보기
	@GetMapping
	public String getBoard(Model model, Long id) {
		Board board = boardService.findById(id);
		model.addAttribute("board", board);
		return "/board/detail";
	}
	
	@GetMapping("/delete")
	public String deleteBoard(Long id) {
		boardService.delete(id);
		return "redirect:/board/";
	}
	
	@GetMapping("/update")
	public String updateForm(Model model, Long id) {
		Board board = boardService.findById(id);
		model.addAttribute("board", board);
		return "/board/boardupdate";
	}
	
	@PostMapping("/update")
	public String update(@ModelAttribute Board board) {
		boardService.update(board);
		return "redirect:/board?id=" + board.getId();
	}
		
}
