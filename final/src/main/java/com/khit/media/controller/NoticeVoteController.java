package com.khit.media.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.khit.media.entity.Vote;
import com.khit.media.service.BoardService;
import com.khit.media.service.VoteService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/noticevote")
@RequiredArgsConstructor
@Controller
public class NoticeVoteController {
	private final VoteService voteService;
	private final BoardService boardService;
	
	@GetMapping("/{boardId}/{voter}")
	public String vote(@PathVariable Long boardId, @PathVariable String voter) {
		List<Vote> findVote = voteService.findByBoardIdAndVoter(boardId, voter);
		if(findVote.isEmpty()) {
			Vote vote = new Vote();
			vote.setBoardId(boardId);
			vote.setVoter(voter);
			voteService.save(vote);
		}else {
			voteService.deleteByBoardIdAndVoter(boardId, voter);
		}
		boardService.updateHits2(boardId);
		boardService.updateLikeCount(boardId);
		return "redirect:/noticeboard/" + boardId;
	}
}
