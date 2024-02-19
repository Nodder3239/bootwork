package com.khit.media.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.khit.media.dto.BoardDTO;
import com.khit.media.entity.Board;
import com.khit.media.repository.BoardRepository;
import com.khit.media.repository.VoteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
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
		boardDTO.setBoardHits(0);
		boardDTO.setReplyCount(0);
		boardDTO.setLikeCount(0);
		boardDTO.setReportCount(0);
		Board board = Board.toSaveBoardEntity(boardDTO);
		boardRepository.save(board);
	}

	public BoardDTO findById(Long id) {
		Optional<Board> board = boardRepository.findById(id);
		BoardDTO boardDTO = BoardDTO.toSaveBoardDTO(board.get());
		return boardDTO;
		
	}

	public void delete(Long id) {
		boardRepository.deleteById(id);
	}

	public void update(BoardDTO boardDTO, MultipartFile boardFile) throws Exception {
		Board board;
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
			board = Board.toUpdateBoardEntity(boardDTO);
			

		}else{
			boardDTO.setFilename(findById(boardDTO.getId()).getFilename());
			boardDTO.setFilepath(findById(boardDTO.getId()).getFilepath());
			board = Board.toUpdateBoardEntity(boardDTO);

		}
		
	    boardRepository.save(board);		
	}
	
	public Page<BoardDTO> findByTitle(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardTitleContaining(kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		
		return boardDTOList;
	}

	public Page<BoardDTO> findByContent(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardContentContaining(kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
   	}

	public Page<BoardDTO> findByWriter(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardWriterContaining(kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
   	}

	public List<BoardDTO> findAll() {
	    List<Board> boardList = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
	    List<BoardDTO> boardDTOList = new ArrayList<>();

	    for (Board board : boardList) {
	        BoardDTO boardDTO = new BoardDTO();
	        boardDTO.setId(board.getId());
	        boardDTO.setBoardTitle(board.getBoardTitle());
	        boardDTO.setBoardWriter(board.getBoardWriter());
	        boardDTO.setBoardContent(board.getBoardContent());
	        boardDTO.setBoardCategory(board.getBoardCategory());
	        boardDTO.setBoardHits(board.getBoardHits());
	        boardDTO.setReplyCount(board.getReplyCount());
	        boardDTO.setLikeCount(board.getLikeCount());
	        boardDTO.setFilename(board.getFilename());
	        boardDTO.setFilepath(board.getFilepath());
	        boardDTO.setCreatedDate(board.getCreatedDate());
	        boardDTO.setUpdatedDate(board.getUpdatedDate());

	        boardDTOList.add(boardDTO);
	    }

	    return boardDTOList;
	}

   	@Transactional
	public void updateHits(Long id) {
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
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));				
		return boardDTOList;
	}
	
	public Page<BoardDTO> findListAll5(Pageable pageable) {
		int page = pageable.getPageNumber() - 1;	//db가 1 작음
		int pageSize = 5;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findAll(pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));				
		return boardDTOList;
	}	
	
	//임시
	public Page<BoardDTO> findListAll(Pageable pageable, String c) {
		int page = pageable.getPageNumber() - 1;	//db가 1 작음
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryContaining(c, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
	}

	public Page<BoardDTO> findByTitle(String kw, Pageable pageable, String cate) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryContainingAndBoardTitleContaining(cate, kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));		
		return boardDTOList;
	}

	public Page<BoardDTO> findByContent(String kw, Pageable pageable, String cate) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryContainingAndBoardContentContaining(cate, kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
   	}

	public Page<BoardDTO> findByWriter(String kw, Pageable pageable, String cate) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryContainingAndBoardWriterContaining(cate, kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
   	}
	
	@Transactional
	public void updateReplyCount(Long id) {
		boardRepository.updateReplyCount(id);		
	}
	
	@Transactional
	public void updateLikeCount(Long id) {
		boardRepository.updateLikeCount(id);		
	}
	
	@Transactional
	public void updateReportCount(Long id) {
		boardRepository.updateReportCount(id);		
	}

	public Page<BoardDTO> findListAllOrderByVoteCount(Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 5;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "likeCount");
		
		Page<Board> boardList = boardRepository.findAll(pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
	}

	public BoardDTO findNotice() {
		String cate = "notice";
		List<Board> boardList = boardRepository.findByBoardCategoryContaining(cate);
		if (!boardList.isEmpty()) {
	        Board notice = boardList.get(0);
	        BoardDTO noticeDTO = BoardDTO.toSaveBoardDTO(notice);
	        return noticeDTO;
	    } else {
	        // 빈 페이지 처리 또는 예외 처리
	        return null; // 또는 예외를 throw하여 처리할 수 있음
	    }
	}
	
	//신고게시판용
	public Page<BoardDTO> findReportListAll(Pageable pageable) {
		int page = pageable.getPageNumber() - 1;	//db가 1 작음
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "reportCount");
		
		Page<Board> boardList = boardRepository.findAll(pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
	}

	public Page<BoardDTO> findReportByTitle(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "reportCount");
		
		Page<Board> boardList = boardRepository.findByBoardTitleContaining(kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));		
		return boardDTOList;
	}

	public Page<BoardDTO> findReportByContent(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "reportCount");
		
		Page<Board> boardList = boardRepository.findByBoardContentContaining(kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
   	}

	public Page<BoardDTO> findReportByWriter(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "reportCount");
		
		Page<Board> boardList = boardRepository.findByBoardWriterContaining(kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
   	}

	public Page<BoardDTO> findVoteListAll2(String voter, Pageable pageable) {
		
		int page1 = pageable.getPageNumber() - 1;
		int pageSize = 3;
		pageable = PageRequest.of(page1, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findVoteListAll(voter, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
				
		return boardDTOList;
	}
	

	public Page<BoardDTO> findByWriter2(String name, Pageable pageable) {
	    int page2 = pageable.getPageNumber() - 1;
	    int pageSize = 3;
	    pageable = PageRequest.of(page2, pageSize, Sort.Direction.DESC, "id");

	    Page<Board> boardList = boardRepository.findByBoardWriter(name, pageable); // 수정된 부분
	    Page<BoardDTO> boardDTOList = boardList.map(board ->
	        new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(), 
	                board.getBoardWriter(), board.getBoardContent(),
	                board.getBoardCategory(), board.getBoardHits(),
	                board.getReplyCount(), board.getLikeCount(),
	                board.getReportCount(), board.getFilename(),
	                board.getFilepath(), board.getCreatedDate(),
	                board.getUpdatedDate()));
	    return boardDTOList;
	}

	public Page<BoardDTO> findVoteListAll(String voter, Pageable pageable) {
		int page1 = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page1, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findVoteListAll(voter, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
	}
	
	@Transactional
	public void deleteByBid(Integer bid) {
		boardRepository.deleteByBid(bid);
		
	}

	public Page<BoardDTO> findByBid(String kw, Pageable pageable) {
		int page1 = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page1, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBid(kw, pageable);
		Page<BoardDTO> boardDTOList = boardList.map(board ->
		new BoardDTO(board.getId(), board.getBoardTitle(), board.getBid(),
				board.getBoardWriter(), board.getBoardContent(), 
				board.getBoardCategory(), board.getBoardHits(),
				board.getReplyCount(), board.getLikeCount(),
				board.getReportCount(),	board.getFilename(), 
				board.getFilepath(), board.getCreatedDate(), 
				board.getUpdatedDate()));
		return boardDTOList;
	}


}
