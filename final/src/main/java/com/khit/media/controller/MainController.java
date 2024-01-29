package com.khit.media.controller;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.khit.media.entity.Board;
import com.khit.media.service.BoardService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class MainController {
	
	private final BoardService boardService;
	
	@GetMapping
	public String index(@PageableDefault(page=1) Pageable pageable, Model model) {
		Page<Board> boardList = boardService.findListAllOrderByVoteCount(pageable);	
		model.addAttribute("boardList", boardList);
		Board notice = boardService.findNotice();
		model.addAttribute("notice", notice);
		return "/index";	//index.html
	}
}
