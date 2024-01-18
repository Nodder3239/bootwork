package com.khit.board.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;

import com.khit.board.dto.BoardDTO;
import com.khit.board.entity.Board;
import com.khit.board.exception.BootBoardException;
import com.khit.board.repository.BoardRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class BoardService {
	
	private final BoardRepository boardRepository;
	
	public void save(BoardDTO boardDTO) {
		Board board = Board.toSaveBoardEntity(boardDTO);
		boardRepository.save(board);
	}
	/*
	public List<Board> findAll() {
		//정렬 - 오름차순
		//내림차순 - Sort 클래스 사용
		return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
	}
	*/
	public BoardDTO findById(Long id) {
		Optional<Board> findBoard = boardRepository.findById(id);
		if(findBoard.isPresent()) {
			BoardDTO boardDTO = BoardDTO.toSaveBoardDTO(findBoard.get());
			return boardDTO;
		}else {
			throw new BootBoardException("게시글을 찾을 수 없습니다.");
		}
		
		
	}

	public void delete(Long id) {
		boardRepository.deleteById(id);
		
	}

	public void update(BoardDTO boardDTO) {
		//boardDTO.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
		Board board = Board.toUpdateBoardEntity(boardDTO);
		boardRepository.save(board);
		
	}
	
	public Page<BoardDTO> findByTitle(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardTitleContaining(kw, pageable);
				
		//생성자 방식으로 boardDTOList를 가져오기
		Page<BoardDTO> boardDTOList = boardList.map(board ->
				new BoardDTO(board.getId(), board.getBoardTitle(), 
						board.getBoardWriter(), board.getBoardContent(), 
						board.getBoardCategory(), board.getBoardHits(), 
						board.getCreatedDate(), board.getUpdatedDate()));
		
		return boardDTOList;
	}

	public Page<BoardDTO> findByContent(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardContentContaining(kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
				new BoardDTO(board.getId(), board.getBoardTitle(), 
						board.getBoardWriter(), board.getBoardContent(), 
						board.getBoardCategory(), board.getBoardHits(), 
						board.getCreatedDate(), board.getUpdatedDate()));

		return boardDTOList;
   	}

	public Page<BoardDTO> findByWriter(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardWriterContaining(kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
				new BoardDTO(board.getId(), board.getBoardTitle(), 
						board.getBoardWriter(), board.getBoardContent(), 
						board.getBoardCategory(), board.getBoardHits(), 
						board.getCreatedDate(), board.getUpdatedDate()));

		return boardDTOList;
   	}

   	public List<BoardDTO> findAll() {
   		//Pageable pageable = PageRequest.of(page, 10, Sort.by("id").descending());
   		List<Board> boardList = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<BoardDTO> boardDTOList = new ArrayList<>();
		
		for(Board board : boardList) {
			BoardDTO boardDTO = BoardDTO.toSaveBoardDTO(board);
			boardDTOList.add(boardDTO);
		}		
		return boardDTOList;
   	}
   	
   	@Transactional
	public void updateHits(Long id) {
		//이 메서드를 boardRepository에 생성
		boardRepository.updateHits(id);
	}
   	
   	@Transactional
	public void updateHits2(Long id) {
		boardRepository.updateHits2(id);	
	}
   	
	public Page<BoardDTO> findListAll(Pageable pageable) {
		int page = pageable.getPageNumber() - 1;	//db가 1 작음
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findAll(pageable);
				
		//생성자 방식으로 boardDTOList를 가져오기
		Page<BoardDTO> boardDTOList = boardList.map(board ->
				new BoardDTO(board.getId(), board.getBoardTitle(), 
						board.getBoardWriter(), board.getBoardContent(), 
						board.getBoardCategory(), board.getBoardHits(), 
						board.getCreatedDate(), board.getUpdatedDate()));
		
		return boardDTOList;
	}
	
	//임시
	public Page<BoardDTO> findListAll(Pageable pageable, String c) {
		int page = pageable.getPageNumber() - 1;	//db가 1 작음
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryContaining(c, pageable);
				
		//생성자 방식으로 boardDTOList를 가져오기
		Page<BoardDTO> boardDTOList = boardList.map(board ->
				new BoardDTO(board.getId(), board.getBoardTitle(), 
						board.getBoardWriter(), board.getBoardContent(), 
						board.getBoardCategory(), board.getBoardHits(), 
						board.getCreatedDate(), board.getUpdatedDate()));
		
		return boardDTOList;
	}

	public Page<BoardDTO> findByTitle(String kw, Pageable pageable, String c) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryAndBoardTitleContaining(c, kw, pageable);
				
		//생성자 방식으로 boardDTOList를 가져오기
		Page<BoardDTO> boardDTOList = boardList.map(board ->
				new BoardDTO(board.getId(), board.getBoardTitle(), 
						board.getBoardWriter(), board.getBoardContent(), 
						board.getBoardCategory(), board.getBoardHits(), 
						board.getCreatedDate(), board.getUpdatedDate()));
		
		return boardDTOList;
	}

	public Page<BoardDTO> findByContent(String kw, Pageable pageable, String c) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryAndBoardContentContaining(c, kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
				new BoardDTO(board.getId(), board.getBoardTitle(), 
						board.getBoardWriter(), board.getBoardContent(), 
						board.getBoardCategory(), board.getBoardHits(), 
						board.getCreatedDate(), board.getUpdatedDate()));

		return boardDTOList;
   	}

	public Page<BoardDTO> findByWriter(String kw, Pageable pageable, String c) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryAndBoardWriterContaining(c, kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
				new BoardDTO(board.getId(), board.getBoardTitle(), 
						board.getBoardWriter(), board.getBoardContent(), 
						board.getBoardCategory(), board.getBoardHits(), 
						board.getCreatedDate(), board.getUpdatedDate()));

		return boardDTOList;
   	}
	

}
