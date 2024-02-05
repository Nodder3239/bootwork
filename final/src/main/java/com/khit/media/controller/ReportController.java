package com.khit.media.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.khit.media.dto.BoardDTO;
import com.khit.media.entity.Report;
import com.khit.media.service.BoardService;
import com.khit.media.service.ReplyService;
import com.khit.media.service.ReportService;
import com.khit.media.service.VoteService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/report")
@RequiredArgsConstructor
@Controller
public class ReportController {
	
	private final BoardService boardService;
	private final ReportService reportService;
	private final ReplyService replyService;
	private final VoteService voteService;
	
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
		return "report/list";
	}
	
	@GetMapping("/{boardId}/{voter}")
	public String vote(@PathVariable Long boardId, @PathVariable String reporter) {
		List<Report> findVote = reportService.findByBoardIdAndReporter(boardId, reporter);
		if(findVote.isEmpty()) {
			Report report = new Report();
			report.setBoardId(boardId);
			report.setReporter(reporter);
			reportService.save(report);
		}else {
			reportService.deleteByBoardIdAndReporter(boardId, reporter);
		}
		boardService.updateHits2(boardId);
		boardService.updateReportCount(boardId);
		return "redirect:/board/" + boardId;
	}
	
	@GetMapping("/delete/{id}")
	public String deleteBoard(@PathVariable Long id) {
		boardService.delete(id);
		replyService.deleteByBoardId(id);
		voteService.deleteByBoardId(id);
		return "redirect:/report/";
	}
}
