package com.khit.media.controller;

import java.util.ArrayList;
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
import com.khit.media.dto.MemberDTO;
import com.khit.media.dto.ReplyDTO;
import com.khit.media.service.BoardService;
import com.khit.media.service.MemberService;
import com.khit.media.service.ReplyService;
import com.khit.media.service.ReportService;
import com.khit.media.service.VoteService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/infoboard")
@RequiredArgsConstructor
@Controller
public class InfoBoardController {
	
	private final MemberService memberService;
	private final BoardService boardService;
	private final ReplyService replyService;
	private final VoteService voteService;
	private final ReportService reportService;

	
	//글쓰기 페이지
	@GetMapping("/write")
	public String writeForm(BoardDTO boardDTO) {
		return "info/write";
	}
	
	//글쓰기
	@PostMapping("/write")
	public String write(BoardDTO boardDTO, MultipartFile boardFile,
			@AuthenticationPrincipal SecurityUser principal) throws Exception {
		//글쓰기 처리
		boardDTO.setBid(principal.getMember().getId());
		boardDTO.setBoardWriter(principal.getMember().getName());
		boardDTO.setBoardHits(0);
		boardDTO.setReplyCount(0);
		boardDTO.setLikeCount(0);
		boardService.save(boardDTO, boardFile);
		return "redirect:/infoboard/";
	}
	
	//글 목록 보기
	@GetMapping("/")
	public String getPageList(@PageableDefault(page=1) Pageable pageable, 
			Model model, @RequestParam(value="field", required = false) String field, 
			@RequestParam(value="kw", required = false) String kw, 
			@RequestParam(value="cate", required = false) String cate) {
		if (cate == null) {
	        cate = "info"; // 기본 카테고리 설정
	    }
		
		Page<BoardDTO> boardList;
		if ("t".equals(field)) {
			boardList = boardService.findByTitle(kw, pageable, cate);
		} else if ("c".equals(field)) {
			boardList = boardService.findByContent(kw, pageable, cate);
		} else if ("w".equals(field)){
			boardList = boardService.findByWriter(kw, pageable, cate);
		} else {
			boardList = boardService.findListAll(pageable, cate);
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
		model.addAttribute("cate", cate);
		
		//공지 띄우기
		BoardDTO notice = boardService.findNotice();
		model.addAttribute("notice", notice);
		return "info/list";
	}
	
	
	
	//글 상세보기
	@GetMapping("/{id}")
	public String getBoard(@PageableDefault(page=1) Pageable pageable, @PathVariable Long id, Model model) {
		//조회수
		boardService.updateHits(id);
		boardService.updateReplyCount(id);
		//글 상세보기
		BoardDTO boardDTO = boardService.findById(id);
		
		MemberDTO memberDTO = memberService.findById(boardDTO.getBid());
		if (memberDTO != null) { // memberDTO가 null이 아닌 경우에만 실행
		    String name = memberDTO.getMemberId();
		    if (name != null && name.length() > 3) { // memberId가 null이 아니고 길이가 3보다 큰 경우에만 실행
		        int startIndex = (name.length() - 3) / 2;
		        int endIndex = startIndex + 3;
		        
		        StringBuilder maskedId = new StringBuilder(name);
		        for (int i = startIndex; i < endIndex; i++) {
		            maskedId.setCharAt(i, '*');
		        }
		        String mask = maskedId.toString();
		        memberDTO.setMemberId(mask);
		    }
		}
		model.addAttribute("writer", memberDTO);
		//댓글 목록
		List<ReplyDTO> replyList = replyService.findByBoardId(id);

		List<String> thumbList = new ArrayList<>();
		for (ReplyDTO replyDTO : replyList) {
		    Integer rid = replyDTO.getRid();
		    MemberDTO replyerDTO = memberService.findById(rid);
		    
		    if (replyerDTO != null) {
		        String memberId = replyerDTO.getMemberId();
		        
		        if (memberId != null && memberId.length() > 3) {
		            int startIndex = (memberId.length() - 3) / 2;
		            int endIndex = startIndex + 3;
		            
		            StringBuilder maskedId = new StringBuilder(memberId);
		            for (int i = startIndex; i < endIndex; i++) {
		                maskedId.setCharAt(i, '*');
		            }
		            
		            thumbList.add(maskedId.toString());
		        } else {
		            thumbList.add(memberId);
		        }
		        
		        thumbList.add(replyerDTO.getFilename());
		    }
		}

		model.addAttribute("thumbList", thumbList);   
	    
		model.addAttribute("board", boardDTO);
		model.addAttribute("replyList", replyList);
		model.addAttribute("page", pageable.getPageNumber());
		return "info/detail";
	}
	
	@GetMapping("/delete/{id}")
	public String deleteBoard(@PathVariable Long id) {
		boardService.delete(id);
		replyService.deleteByBoardId(id);
		voteService.deleteByBoardId(id);
		reportService.deleteByBoardId(id);
		return "redirect:/infoboard/";
	}
	
	@GetMapping("/update/{id}")
	public String updateForm(Model model, @PathVariable Long id) {
		BoardDTO boardDTO = boardService.findById(id);
		model.addAttribute("board", boardDTO);
		return "info/update";
	}
	
	@PostMapping("/update")
	public String update(@ModelAttribute BoardDTO boardDTO
			, MultipartFile boardFile
			, @AuthenticationPrincipal SecurityUser principal) throws Exception {
		boardDTO.setBid(principal.getMember().getId());
		boardDTO.setBoardWriter(principal.getMember().getName());
		boardService.updateHits2(boardDTO.getId());
		boardService.update(boardDTO, boardFile);
		return "redirect:/infoboard/" + boardDTO.getId();
	}

}
