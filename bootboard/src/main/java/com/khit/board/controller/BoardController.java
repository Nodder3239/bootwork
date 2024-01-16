package com.khit.board.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.khit.board.dto.BoardDTO;
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
	public String write(@ModelAttribute BoardDTO boardDTO) {
		boardDTO.setBoardHits(0);
		boardService.save(boardDTO);
		return "redirect:/board/";
	}
	
	//글 목록 보기
	@GetMapping("/")
	public String getBoardList(/*@RequestParam(value="page", defaultValue="0") int page,*/ Model model, String field, String kw) {
	  
		List<BoardDTO> boardList;
			if ("t".equals(field)) {
				boardList = boardService.findByTitle(kw);
			} else if ("c".equals(field)) {
				boardList = boardService.findByContent(kw);
			} else if ("w".equals(field)){
				boardList = boardService.findByWriter(kw);
			}else {
				boardList = boardService.findAll();
		       
		}
		model.addAttribute("boardList", boardList);
		//List<Board> boardList = boardService.findAll();
		model.addAttribute("field", field);
		model.addAttribute("kw", kw);
		//model.addAttribute("page", page);
		return "/board/list";
	}
	
	
	//글 상세보기
	@GetMapping("/{id}")
	public String getBoard(@PathVariable Long id, Model model) {
		//조회수
		boardService.updateHits(id);
		//글 상세보기
		BoardDTO boardDTO = boardService.findById(id);
		model.addAttribute("board", boardDTO);
		return "/board/detail";
	}
	
	@GetMapping("/delete/{id}")
	public String deleteBoard(@PathVariable Long id) {
		boardService.delete(id);
		return "redirect:/board/";
	}
	
	@GetMapping("/update/{id}")
	public String updateForm(Model model, @PathVariable Long id) {
		boardService.updateHits2(id);
		BoardDTO boardDTO = boardService.findById(id);
		model.addAttribute("board", boardDTO);
		return "/board/boardupdate";
	}
	
	@PostMapping("/update")
	public String update(@ModelAttribute BoardDTO boardDTO) {
		boardService.update(boardDTO);
		return "redirect:/board/" + boardDTO.getId();
	}
		
}
