package com.khit.media.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.khit.media.config.SecurityUser;
import com.khit.media.dto.BoardDTO;
import com.khit.media.dto.ReportDTO;
import com.khit.media.service.BoardService;
import com.khit.media.service.ReportService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class ReportController {
	
	private final BoardService boardService;
	private final ReportService reportService;
	
	@GetMapping("/report/")
	public String getPageList(@PageableDefault(page=1) Pageable pageable, 
			Model model, @RequestParam(value="field", required = false) String field, 
			@RequestParam(value="kw", required = false) String kw) {
		Page<BoardDTO> boardList;
		if ("t".equals(field)) {
			boardList = boardService.findReportByTitle(kw, pageable);
		} else if ("c".equals(field)) {
			boardList = boardService.findReportByContent(kw, pageable);
		} else if ("w".equals(field)){
			boardList = boardService.findReportByWriter(kw, pageable);
		}else {
			boardList = boardService.findReportListAll(pageable);
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
	
	@GetMapping("/report/{boardId}")
	public String report(@PathVariable Long boardId,
			@AuthenticationPrincipal SecurityUser principal) {
		List<ReportDTO> findReport = reportService.findByBoardIdAndReporter(boardId, principal.getMember().getName());
		if(findReport.isEmpty()) {
			ReportDTO report = new ReportDTO();
			report.setBoardId(boardId);
			report.setReporter(principal.getMember().getName());
			reportService.save(report);
		}else {
			reportService.deleteByBoardIdAndReporter(boardId, principal.getMember().getName());
		}
		boardService.updateHits2(boardId);
		boardService.updateReportCount(boardId);
		return "redirect:/board/" + boardId;
	}
	
	@GetMapping("/inforeport/{boardId}")
	public String infoReport(@PathVariable Long boardId,
			@AuthenticationPrincipal SecurityUser principal) {
		List<ReportDTO> findReport = reportService.findByBoardIdAndReporter(boardId, principal.getMember().getName());
		if(findReport.isEmpty()) {
			ReportDTO report = new ReportDTO();
			report.setBoardId(boardId);
			report.setReporter(principal.getMember().getName());
			reportService.save(report);
		}else {
			reportService.deleteByBoardIdAndReporter(boardId, principal.getMember().getName());
		}
		boardService.updateHits2(boardId);
		boardService.updateReportCount(boardId);
		return "redirect:/infoboard/" + boardId;
	}
	
	@GetMapping("/noticereport/{boardId}")
	public String noticeReport(@PathVariable Long boardId,
			@AuthenticationPrincipal SecurityUser principal) {
		List<ReportDTO> findReport = reportService.findByBoardIdAndReporter(boardId, principal.getMember().getName());
		if(findReport.isEmpty()) {
			ReportDTO report = new ReportDTO();
			report.setBoardId(boardId);
			report.setReporter(principal.getMember().getName());
			reportService.save(report);
		}else {
			reportService.deleteByBoardIdAndReporter(boardId, principal.getMember().getName());
		}
		boardService.updateHits2(boardId);
		boardService.updateReportCount(boardId);
		return "redirect:/noticeboard/" + boardId;
	}
	
	@GetMapping("/qnareport/{boardId}")
	public String qnaReport(@PathVariable Long boardId,
			@AuthenticationPrincipal SecurityUser principal) {
		List<ReportDTO> findReport = reportService.findByBoardIdAndReporter(boardId, principal.getMember().getName());
		if(findReport.isEmpty()) {
			ReportDTO report = new ReportDTO();
			report.setBoardId(boardId);
			report.setReporter(principal.getMember().getName());
			reportService.save(report);
		}else {
			reportService.deleteByBoardIdAndReporter(boardId, principal.getMember().getName());
		}
		boardService.updateHits2(boardId);
		boardService.updateReportCount(boardId);
		return "redirect:/qnaboard/" + boardId;
	}
	
}
