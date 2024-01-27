package com.khit.board.service;

import org.springframework.stereotype.Service;

import com.khit.board.entity.Board;
import com.khit.board.entity.Reply;
import com.khit.board.repository.BoardRepository;
import com.khit.board.repository.ReplyRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReplyService {
	private final ReplyRepository replyRepository;
	private final BoardRepository boardRepository;

	public void insertReply(Long boardId, Reply reply) {
		//해당 게시글을 가져와서
		Board board = boardRepository.findById(boardId).get();
		reply.setBoard(board);
		//댓글 저장
		replyRepository.save(reply);
	}
	
	@Transactional
	public void deleteById(Long replyId) {
		replyRepository.deleteById(replyId);
	}
}
