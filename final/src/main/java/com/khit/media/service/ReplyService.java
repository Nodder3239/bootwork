package com.khit.media.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.khit.media.dto.BoardDTO;
import com.khit.media.dto.ReplyDTO;
import com.khit.media.entity.Board;
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


	public Page<ReplyDTO> findByReplyer2(String name, Pageable pageable) {
		int page3 = pageable.getPageNumber() - 1;
		int pageSize = 3;
		pageable = PageRequest.of(page3, pageSize, Sort.Direction.DESC, "id");
		
		Page<Reply> replyList = replyRepository.findByReplyer(name, pageable);
		Page<ReplyDTO> replyDTOList = replyList.map(reply ->
		new ReplyDTO(reply.getId(), reply.getBoardId(), 
				reply.getReplyer(), reply.getRcontent(), 
				reply.getCreatedDate(), reply.getUpdatedDate()));
		return replyDTOList;
	}


	public Page<ReplyDTO> findByReplyer(String name, Pageable pageable) {
		int page3 = pageable.getPageNumber() - 1;
		int pageSize = 3;
		pageable = PageRequest.of(page3, pageSize, Sort.Direction.DESC, "id");
		
		Page<Reply> replyList = replyRepository.findByReplyer(name, pageable);
		Page<ReplyDTO> replyDTOList = replyList.map(reply ->
		new ReplyDTO(reply.getId(), reply.getBoardId(), 
				reply.getReplyer(), reply.getRcontent(), 
				reply.getCreatedDate(), reply.getUpdatedDate()));
		return replyDTOList;
	}

}
