package com.khit.media.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.khit.media.dto.ReplyDTO;
import com.khit.media.entity.Reply;
import com.khit.media.repository.ReplyRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReplyService {
	
	private final ReplyRepository replyRepository;
	
	
	public void insert(ReplyDTO replyDTO) {
		Reply reply = Reply.toSaveReplyEntity(replyDTO);
		replyRepository.save(reply);
	}


	public List<ReplyDTO> findByBoardId(Long boardId) {	
		List<Reply> replyList = replyRepository.findByBoardId(boardId);
		List<ReplyDTO> replyDTOList = new ArrayList<>();
		
		for(Reply reply : replyList) {
			ReplyDTO replyDTO = ReplyDTO.toSaveReplyDTO(reply);
			replyDTOList.add(replyDTO);
		}
		return replyDTOList;
	}


	public ReplyDTO findById(Long id) {
		Reply reply = replyRepository.findById(id).get();
		ReplyDTO replyDTO = ReplyDTO.toSaveReplyDTO(reply);
		return replyDTO;
	}
	
	public Reply findEntityById(Long id) {
		Reply reply = replyRepository.findById(id).get();
		return reply;
	}


	public void update(ReplyDTO replyDTO) {
		Reply reply = Reply.toSaveReplyEntity(replyDTO);
		replyRepository.save(reply);		
	}


	public void delete(Long id) {
		replyRepository.deleteById(id);
		
	}

	@Transactional
	public void deleteByBoardId(Long id) {
		replyRepository.deleteByBoardId(id);
		
	}

	@Transactional
	public void deleteByReplyer(String name) {
		replyRepository.deleteByReplyer(name);		
	}



}
