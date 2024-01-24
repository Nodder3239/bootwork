package com.khit.board.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import com.khit.board.entity.Board;
import com.khit.board.repository.BoardRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class BoardService {
	
	private final BoardRepository boardRepository;
	
	public void save(Board board){
		boardRepository.save(board);
	}

	public Board findById(Long id) {
		Board board = boardRepository.findById(id).get();
		return board;
		
	}
	
	/* @Transactional */
	public void deleteById(Long id) {
		boardRepository.deleteById(id);
	}

	public void update(Board board){
	    boardRepository.save(board);		
	}
	
	@Transactional
	public void updateHits(Long id) {
		boardRepository.updateHits(id);
	}
   	
   	@Transactional
	public void updateHits2(Long id) {
		boardRepository.updateHits2(id);	
	}
	
	public Page<Board> findByTitle(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByTitleContaining(kw, pageable);
				
		return boardList;
	}

	public Page<Board> findByContent(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByContentContaining(kw, pageable);
		return boardList;
   	}
	
	
	public Page<Board> findByMember(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByMemberMemberIdContaining(kw, pageable);
		return boardList;
   	}
   	


	public Page<Board> findListAll(Pageable pageable) {
		int page = pageable.getPageNumber() - 1;	//db가 1 작음
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findAll(pageable);				
		return boardList;
	}

	public List<Board> findAll() {
		return boardRepository.findAll();
	}
}
	