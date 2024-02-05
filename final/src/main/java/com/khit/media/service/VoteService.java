package com.khit.media.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.khit.media.dto.VoteDTO;
import com.khit.media.entity.Vote;
import com.khit.media.repository.VoteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class VoteService {
	
	private final VoteRepository voteRepository;

	public List<VoteDTO> findByBoardIdAndVoter(Long boardId, String voter) {
		List<Vote> voteList = voteRepository.findByBoardIdAndVoter(boardId, voter);
		List<VoteDTO> voteDTOList = new ArrayList<>();
		for(Vote vote : voteList) {
			VoteDTO voteDTO = VoteDTO.toSaveVoteDTO(vote);
			voteDTOList.add(voteDTO);
		}
		return voteDTOList;
	}

	public void save(VoteDTO voteDTO) {
		Vote vote = Vote.toSaveVoteEntity(voteDTO);
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
