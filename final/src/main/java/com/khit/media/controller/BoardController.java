package com.khit.media.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.khit.media.config.SecurityUser;
import com.khit.media.dto.BoardDTO;
import com.khit.media.dto.ReplyDTO;
import com.khit.media.service.BoardService;
import com.khit.media.service.ReplyService;
import com.khit.media.service.ReportService;
import com.khit.media.service.VoteService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/board")
@RequiredArgsConstructor
@Controller
public class BoardController {

	private final BoardService boardService;
	private final ReplyService replyService;
	private final VoteService voteService;
	private final ReportService reportService;

	/*
	//글쓰기 페이지
	@GetMapping("/write")
	public String writeForm(Board board) {
		return "board/write";
	}
	
	//글쓰기
	@PostMapping("/write")
	public String write(BoardDTO boardDTO, MultipartFile boardFile) throws Exception {
		//글쓰기 처리
		boardDTO.setBoardHits(0);
		boardDTO.setReplyCount(0);
		boardDTO.setLikeCount(0);
		boardService.save(board, boardFile);
		return "redirect:/board/";
	}
	*/
	
	@GetMapping("/main")
	public String indexForm(@PageableDefault(page=1) Pageable pageable, Model model) {
		Page<BoardDTO> boardList = boardService.findListAllOrderByVoteCount(pageable);	
		model.addAttribute("boardList", boardList);
		BoardDTO notice = boardService.findNotice();
		model.addAttribute("notice", notice);
		return "board/main";
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
		return "board/list";
	}
	
	
	
	//글 상세보기
	@GetMapping("/{id}")
	public String getBoard(@PageableDefault(page=1) Pageable pageable, @PathVariable Long id, Model model) {
		//조회수
		boardService.updateHits(id);
		boardService.updateReplyCount(id);
		//글 상세보기
		BoardDTO boardDTO = boardService.findById(id);
		//댓글 목록
		List<ReplyDTO> replyList = replyService.findByBoardId(id);
		model.addAttribute("board", boardDTO);
		model.addAttribute("replyList", replyList);
		model.addAttribute("page", pageable.getPageNumber());
		return "board/detail";
	}
	
	@GetMapping("/delete/{id}")
	public String deleteBoard(@PathVariable Long id) {
		boardService.delete(id);
		replyService.deleteByBoardId(id);
		voteService.deleteByBoardId(id);
		reportService.deleteByBoardId(id);
		return "redirect:/board/";
	}
	
	@GetMapping("/update/{id}")
	public String updateForm(Model model, @PathVariable Long id) {
		BoardDTO boardDTO = boardService.findById(id);
		model.addAttribute("board", boardDTO);
		return "board/update";
	}
	
	@PostMapping("/update")
	public String update(@ModelAttribute BoardDTO boardDTO, MultipartFile boardFile) throws Exception {
		boardService.updateHits2(boardDTO.getId());
		boardService.update(boardDTO, boardFile);
		return "redirect:/board/" + boardDTO.getId();
	}
	
	@GetMapping("/votelist/")
	public String voteList(
			@AuthenticationPrincipal SecurityUser principal,
			@PageableDefault(page=1) Pageable pageable, 
			Model model) {
		Page<BoardDTO> voteList = boardService.findVoteListAll(principal.getMember().getName(), pageable);
		int blockLimit = 10;	//하단에 보여줄 페이지 개수
		int startPage = ((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))-1) *blockLimit+1;
		int endPage = Math.min((startPage+blockLimit-1), voteList.getTotalPages());
		int nowPage = voteList.getNumber() + 1;
		if(endPage == 0) {
	         endPage = 1;
	      }
		model.addAttribute("boardList", voteList);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		model.addAttribute("nowPage", nowPage);
		return "mypage/votelist";
	}
	
	//글 상세보기
	@GetMapping("/votelist/{id}")
	public String getVoteList(@PageableDefault(page=1) Pageable pageable, @PathVariable Long id, Model model) {
		//조회수
		boardService.updateHits(id);
		boardService.updateReplyCount(id);
		//글 상세보기
		BoardDTO boardDTO = boardService.findById(id);
		//댓글 목록
		List<ReplyDTO> replyList = replyService.findByBoardId(id);
		model.addAttribute("board", boardDTO);
		model.addAttribute("replyList", replyList);
		model.addAttribute("page", pageable.getPageNumber());
		return "mypage/votelistdetail";
	}
	
	
	@GetMapping("/myboardlist/")
	public String myboardList(
			@AuthenticationPrincipal SecurityUser principal,
			@PageableDefault(page=1) Pageable pageable, 
			Model model) {
		Page<BoardDTO> myboardList = boardService.findByWriter(principal.getMember().getName(), pageable);
		int blockLimit = 10;	//하단에 보여줄 페이지 개수
		int startPage = ((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))-1) *blockLimit+1;
		int endPage = Math.min((startPage+blockLimit-1), myboardList.getTotalPages());
		int nowPage = myboardList.getNumber() + 1;
		if(endPage == 0) {
	         endPage = 1;
	      }
		model.addAttribute("boardList", myboardList);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		model.addAttribute("nowPage", nowPage);
		return "mypage/myboardlist";
	}
	@GetMapping("/myreplylist/")
	public String myreplyList(
			@AuthenticationPrincipal SecurityUser principal,
			@PageableDefault(page=1) Pageable pageable, 
			Model model) {
		Page<ReplyDTO> myreplyList = replyService.findByReplyer(principal.getMember().getName(), pageable);
		int blockLimit = 10;	//하단에 보여줄 페이지 개수
		int startPage = ((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))-1) *blockLimit+1;
		int endPage = Math.min((startPage+blockLimit-1), myreplyList.getTotalPages());
		int nowPage = myreplyList.getNumber() + 1;
		if(endPage == 0) {
	         endPage = 1;
	      }
		model.addAttribute("replyList", myreplyList);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		model.addAttribute("nowPage", nowPage);
		return "mypage/myreplylist";
	}
	

	
}
