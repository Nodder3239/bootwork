package com.khit.board.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import com.khit.board.dto.BoardDTO;
import com.khit.board.entity.Board;
import com.khit.board.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class BoardService {
	
	private final BoardRepository boardRepository;
	
	public void save(BoardDTO boardDTO){
		Board board = Board.toSaveEntity(boardDTO);
		boardRepository.save(board);
	}

	public BoardDTO findById(Long id) {
		Board board = boardRepository.findById(id).get();
		BoardDTO boardDTO = BoardDTO.toSaveDTO(board);
		return boardDTO;
		
	}
	
	/* @Transactional */
	public void deleteById(Long id) {
		boardRepository.deleteById(id);
	}

	public void update(BoardDTO boardDTO){
		Board board = Board.toSaveEntity(boardDTO);
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
	
	public Page<BoardDTO> findByTitle(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByTitleContaining(kw, pageable);
		
		//생성자 방식으로 boardDTOList를 가져오기
		Page<BoardDTO> boardDTOList = boardList.map(board ->
			new BoardDTO(board.getId(), board.getTitle(), 
					board.getContent(), board.getHits(), 
					board.getMember(), board.getReplyList(),
					board.getCreatedDate(), board.getUpdatedDate()));
		return boardDTOList;
	}

	public Page<BoardDTO> findByContent(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByContentContaining(kw, pageable);
		
		//생성자 방식으로 boardDTOList를 가져오기
		Page<BoardDTO> boardDTOList = boardList.map(board ->
			new BoardDTO(board.getId(), board.getTitle(), 
					board.getContent(), board.getHits(), 
					board.getMember(), board.getReplyList(),
					board.getCreatedDate(),	board.getUpdatedDate()));
		return boardDTOList;
   	}
	
	
	public Page<BoardDTO> findByMember(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByMemberMemberIdContaining(kw, pageable);
		
		//생성자 방식으로 boardDTOList를 가져오기
		Page<BoardDTO> boardDTOList = boardList.map(board ->
			new BoardDTO(board.getId(), board.getTitle(), 
					board.getContent(), board.getHits(), 
					board.getMember(), board.getReplyList(),
					board.getCreatedDate(), board.getUpdatedDate()));
		
		return boardDTOList;
   	}
   	


	public Page<BoardDTO> findListAll(Pageable pageable) {
		int page = pageable.getPageNumber() - 1;	//db가 1 작음
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findAll(pageable);	
		
		//생성자 방식으로 boardDTOList를 가져오기
		Page<BoardDTO> boardDTOList = boardList.map(board ->
				new BoardDTO(board.getId(), board.getTitle(), 
						board.getContent(), board.getHits(), 
						board.getMember(), board.getReplyList(),
						board.getCreatedDate(),	board.getUpdatedDate()));
		
		return boardDTOList;
	}

}
	