package com.khit.board.controller;

import java.io.IOException;
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
import org.springframework.web.multipart.MultipartFile;

import com.khit.board.dto.BoardDTO;
import com.khit.board.service.BoardService;

import jakarta.validation.Valid;
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
	public String writeForm(BoardDTO boardDTO) {
		return "/board/write";
	}
	
	//글쓰기
	@PostMapping("/write")
	public String write(@Valid BoardDTO boardDTO, BindingResult bindingResult, MultipartFile boardFile) throws Exception {
		if(bindingResult.hasErrors()) {		//에러가 있으면 글쓰기 폼으로 이동
			return "/board/write";
		}
		//글쓰기 처리
		boardService.save(boardDTO, boardFile);
		return "redirect:/board/";
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
		return "/board/list";
	}
	
	/*
	@GetMapping("/")
	public String getPageList(@PageableDefault(page=1) Pageable pageable, Model model
					@RequestParam(value="keyword", required = false) String keyword,
					@RequestParam(value="type", required = false) type) {
		Page<BoardDTO> boardList = null;
		if(boardList == null){
			Page<BoardDTO> boardList = boardService.findListAll(pageable);
		}else if(type != null && type.equals("title")){
			Page<BoardDTO> boardList = boardService.findByBoardTitleContaing(kw, pageable);
		}else if(type != null && type.equals("content")){
			Page<BoardDTO> boardList = boardService.findByBoardContentContaing(kw, pageable);
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
		model.addAttribute("type", type);
		model.addAttribute("keyword", keyword);
		return "/board/pagelist";
	}
	*/
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
			boardList = boardService.findByWriter(kw, pageable);
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
	public String update(@ModelAttribute BoardDTO boardDTO, MultipartFile boardFile) throws Exception {
		boardService.update(boardDTO, boardFile);
		return "redirect:/board/" + boardDTO.getId();
	}
		
}
