package com.khit.media.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.khit.media.config.SecurityUser;
import com.khit.media.dto.VoteDTO;
import com.khit.media.service.BoardService;
import com.khit.media.service.VoteService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/infovote")
@RequiredArgsConstructor
@Controller
public class InfoVoteController {
	private final VoteService voteService;
	private final BoardService boardService;
	
	@GetMapping("/{boardId}")
	public String vote(@PathVariable Long boardId,
			@AuthenticationPrincipal SecurityUser principal) {
		List<VoteDTO> findVote = voteService.findByBoardIdAndVoter(boardId, principal.getMember().getName());
		if(findVote.isEmpty()) {
			VoteDTO vote = new VoteDTO();
			vote.setBoardId(boardId);
			vote.setVoter(principal.getMember().getName());
			voteService.save(vote);
		}else {
			voteService.deleteByBoardIdAndVoter(boardId, principal.getMember().getName());
		}
		boardService.updateHits2(boardId);
		boardService.updateLikeCount(boardId);
		return "redirect:/infoboard/" + boardId;
	}
}
