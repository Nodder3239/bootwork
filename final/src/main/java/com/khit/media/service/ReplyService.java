package com.khit.media.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.khit.media.entity.Reply;
import com.khit.media.repository.ReplyRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReplyService {
	
	private final ReplyRepository replyRepository;
	
	
	public void insert(Reply reply) {
		replyRepository.save(reply);
	}


	public List<Reply> findByBoardId(Long boardId) {	
		return replyRepository.findByBoardId(boardId);
	}


	public Reply findById(Long id) {
		return replyRepository.findById(id).get();
	}


	public void update(Reply reply) {
		replyRepository.save(reply);		
	}


	public void delete(Long id) {
		replyRepository.deleteById(id);
		
	}

	@Transactional
	public void deleteByBoardId(Long id) {
		replyRepository.deleteByBoardId(id);
		
	}



}
