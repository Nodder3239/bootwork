package com.khit.media.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.khit.media.entity.Vote;
import com.khit.media.repository.VoteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class VoteService {
	
	private final VoteRepository voteRepository;

	public List<Vote> findByBoardIdAndVoter(Long boardId, String voter) {
		List<Vote> voteList = voteRepository.findByBoardIdAndVoter(boardId, voter);
		return voteList;
	}

	public void save(Vote vote) {
		voteRepository.save(vote);
		
	}
	
	@Transactional
	public void deleteByBoardIdAndVoter(Long boardId, String voter) {
		voteRepository.deleteByBoardIdAndVoter(boardId, voter);
	}

	public void deleteByBoardId(Long id) {
		voteRepository.deleteByBoardId(id);
		
	}

}
