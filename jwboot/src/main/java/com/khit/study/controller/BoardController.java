package com.khit.study.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.khit.study.entity.Board;
import com.khit.study.service.BoardService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@AllArgsConstructor
@Slf4j
@RequestMapping("/board")
@Controller
public class BoardController {
	
	private BoardService boardService;
	
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
	public String getBoardList(Model model) {
		List<Board> boardList = boardService.findAll();
		model.addAttribute("boardList", boardList);
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
