package com.khit.media.controller;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.khit.media.dto.BoardDTO;
import com.khit.media.service.BoardService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class MainController {
	
	private final BoardService boardService;
	
	@GetMapping
	public String index(@PageableDefault(page=1) Pageable pageable, Model model) {
		Page<BoardDTO> boardList = boardService.findListAll5(pageable);	
		model.addAttribute("boardList", boardList);
		BoardDTO notice = boardService.findNotice();
		model.addAttribute("notice", notice);
		
		return "index";	//index.html
	}
	
	
//	header 메뉴 불러오기 - 재난예방대비, 재난 현황, 참여와 신고
	@GetMapping("/board/preparation")
	public String preparationPage() {
		return "board/preparation";
	}
	@GetMapping("/board/condition")
	public String conditionPage() {
		return "board/condition";
	}
	// chatbot서비스 
	@GetMapping("/chatbot")
	public String chatService() {
		return "chatbot";
	}

// footer 메뉴 (공지사항, FAQ, 개인정보처리방침)

	@GetMapping("/pages/faq")
	public String faqPage() {
		return "pages/faq";
	}
	@GetMapping("/pages/privacyPolicy")
	public String ppPage() {
		return "pages/privacyPolicy";
	}

// pages폴더의 html불러오기
	
	@GetMapping("/pages/public-institution")
	public String publicPages() {
		return "pages/public-institution";
	}
	
	
	
	/* 체크리스트 */
	@GetMapping("/ex/survey")
	public String survey() {
		return "ex/survey";
	}
	
	@PostMapping("/ex/survey")
	public String surveyAdd(
			@RequestParam("volume01") int v01,
	        @RequestParam("volume02") int v02,
	        @RequestParam("volume03") int v03,
	        @RequestParam("volume04") int v04,
	        @RequestParam("volume05") int v05,
	        @RequestParam("volume06") int v06,
	        @RequestParam("volume11") int v11,
	        @RequestParam("volume12") int v12,
	        @RequestParam("volume13") int v13,
	        @RequestParam("volume14") int v14,
	        @RequestParam("volume15") int v15,
	        @RequestParam("volume16") int v16,
	        @RequestParam("volume21") int v21,
	        @RequestParam("volume22") int v22,
	        @RequestParam("volume23") int v23,
	        @RequestParam("volume24") int v24,
	        @RequestParam("volume25") int v25,
	        @RequestParam("volume26") int v26,
	        @RequestParam("volume27") int v27,
	        @RequestParam("volume28") int v28,
	        @RequestParam("volume31") int v31,
	        @RequestParam("volume32") int v32,
	        @RequestParam("volume33") int v33,
	        @RequestParam("volume34") int v34,
	        @RequestParam("volume35") int v35,
	        @RequestParam("volume36") int v36,
	        @RequestParam("volume37") int v37,
	        @RequestParam("volume41") int v41,
	        @RequestParam("volume42") int v42,
	        @RequestParam("volume43") int v43,
	        @RequestParam("volume44") int v44,
	        @RequestParam("volume45") int v45,
	        @RequestParam("volume46") int v46,
	        @RequestParam("volume47") int v47,
	        @RequestParam("volume48") int v48,
	        @RequestParam("volume49") int v49,
	        HttpSession session) {
		int result0 = v01 + v02 + v03 + v04 + v05 + v06;
		int result1 = v11 + v12 + v13 + v14 + v15 + v16;
		int result2 = v21 + v22 + v23 + v24 + v25 + v26 + v27 + v28;
		int result3 = v31 + v32 + v33 + v34 + v35 + v36 + v37;
		int result4 = v41 + v42 + v43 + v44 + v45 + v46 + v47 + v48 + v49;
		double result = (double)(result0 + result1 + result2 + result3 + result4) / 180 * 100;
		double roundedResult = Math.round(result * 100.0) / 100.0;
		session.setAttribute("result0", result0);
		session.setAttribute("result1", result1);
		session.setAttribute("result2", result2);
		session.setAttribute("result3", result3);
		session.setAttribute("result4", result4);
		session.setAttribute("result", roundedResult);
			
		return "redirect:/ex/surveyResult";
	}
	
	@GetMapping("/ex/surveyResult")
	public String surveyResult() {
		return "ex/surveyResult";
	}
	
	@GetMapping("/ex/return")
	public String returnIndex(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
	
	@GetMapping("/ex/game")
	public String ex() {
		return "ex/game";
	}
}
