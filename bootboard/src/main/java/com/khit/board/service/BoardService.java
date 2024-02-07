package com.khit.board.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

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
	
	public void save(BoardDTO boardDTO, MultipartFile boardFile) throws Exception{
		
		//1. 파일을 서버에 저장하고
		if (!boardFile.isEmpty()) {
						
			UUID uuid = UUID.randomUUID();	//무작위 아이디 생성(중복 파일 이름의 생성)
			
			String filename = uuid.toString() + "_" + boardFile.getOriginalFilename();	//원본 파일
			String filepath = "C:/springfiles/" + filename;
			
			//File 클래스로 객체 생성
			File savedFile = new File(filepath);	//upload 폴더에 저장
			boardFile.transferTo(savedFile);	//서버 폴더에 저장
		
		//2. 파일 이름은 db에 저장
			boardDTO.setFilename(filename);
			boardDTO.setFilepath(filepath);
		}
		
		//dto -> entity로 변환
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

	public void update(BoardDTO boardDTO, MultipartFile boardFile) throws Exception {
		//boardDTO.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
		//1. 파일을 서버에 저장하고
		if (!boardFile.isEmpty()) {
			
			UUID uuid = UUID.randomUUID();	//무작위 아이디 생성(중복 파일 이름의 생성)
			
			String filename = uuid.toString() + "_" + boardFile.getOriginalFilename();	//원본 파일
			String filepath = "C:/springfiles/" + filename;
			
			//File 클래스로 객체 생성
			File savedFile = new File(filepath);	//upload 폴더에 저장
			boardFile.transferTo(savedFile);	//서버 폴더에 저장
		
		//2. 파일 이름은 db에 저장
			boardDTO.setFilename(filename);
			boardDTO.setFilepath(filepath);
		
		}else{
	         //Board board = Board.toUpdateNoFile(boardDTO);
	         //boardRepository.save(board);
			 boardDTO.setFilename(findById(boardDTO.getId()).getFilename());
	         boardDTO.setFilepath(findById(boardDTO.getId()).getFilepath());
	    }
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
						board.getFilename(), board.getFilepath(),
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
						board.getFilename(), board.getFilepath(),
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
						board.getFilename(), board.getFilepath(),
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
						board.getFilename(), board.getFilepath(),
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
						board.getFilename(), board.getFilepath(),
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
						board.getFilename(), board.getFilepath(),
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
						board.getFilename(), board.getFilepath(),
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
						board.getFilename(), board.getFilepath(),
						board.getCreatedDate(), board.getUpdatedDate()));

		return boardDTOList;
   	}
	

}
