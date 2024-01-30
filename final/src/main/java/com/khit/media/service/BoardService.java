package com.khit.media.service;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.khit.media.entity.Board;
import com.khit.media.repository.BoardRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {
	
	private final BoardRepository boardRepository;
	
	public void save(Board board, MultipartFile boardFile) throws Exception{
		
		//1. 파일을 서버에 저장하고
		if (!boardFile.isEmpty()) {
			String filepath = "C:\\bootworks\\final\\src\\main\\resources\\static\\upload\\";
			
			UUID uuid = UUID.randomUUID();	//무작위 아이디 생성(중복 파일 이름의 생성)
			
			String filename = uuid.toString() + "_" + boardFile.getOriginalFilename();	//원본 파일
			
			//File 클래스로 객체 생성
			File savedFile = new File(filepath, filename);	//upload 폴더에 저장
			boardFile.transferTo(savedFile);	//서버 폴더에 저장
		
		//2. 파일 이름은 db에 저장
			board.setFilename(filename);
			board.setFilepath("/upload/" + filename);
		}
		boardRepository.save(board);
	}

	public Board findById(Long id) {
		Optional<Board> board = boardRepository.findById(id);
		return board.get();
		
	}

	public void delete(Long id) {
		boardRepository.deleteById(id);
	}

	public void update(Board board, MultipartFile boardFile) throws Exception {
		//1. 파일을 서버에 저장하고
		if (!boardFile.isEmpty()) {		//
			String filepath = "C:\\bootworks\\final\\src\\main\\resources\\static\\upload";
			
			UUID uuid = UUID.randomUUID();	//무작위 아이디 생성(중복 파일 이름의 생성)
			
			String filename = uuid.toString() + "_" + boardFile.getOriginalFilename();	//원본 파일
			
			//File 클래스로 객체 생성
			File savedFile = new File(filepath, filename);	//upload 폴더에 저장
			boardFile.transferTo(savedFile);	//서버 폴더에 저장
		
		//2. 파일 이름은 db에 저장
			board.setFilename(filename);
			board.setFilepath("/upload/" + filename);
			

		}else{
	         //Board board = Board.toUpdateNoFile(boardDTO);
	         //boardRepository.save(board);
	         board.setFilepath(findById(board.getId()).getFilepath());
	    }
	    boardRepository.save(board);		
	}
	
	public Page<Board> findByTitle(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardTitleContaining(kw, pageable);
				
		return boardList;
	}

	public Page<Board> findByContent(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardContentContaining(kw, pageable);

		return boardList;
   	}

	public Page<Board> findByWriter(String kw, Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardWriterContaining(kw, pageable);

		return boardList;
   	}

   	public List<Board> findAll() {
   		List<Board> boardList = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		
		return boardList;
   	}
   	
   	@Transactional
	public void updateHits(Long id) {
		boardRepository.updateHits(id);
	}
   	
   	@Transactional
	public void updateHits2(Long id) {
		boardRepository.updateHits2(id);	
	}
   	
	public Page<Board> findListAll(Pageable pageable) {
		int page = pageable.getPageNumber() - 1;	//db가 1 작음
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findAll(pageable);
						
		return boardList;
	}
	
	//임시
	public Page<Board> findListAll(Pageable pageable, String c) {
		int page = pageable.getPageNumber() - 1;	//db가 1 작음
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryContaining(c, pageable);

		return boardList;
	}

	public Page<Board> findByTitle(String kw, Pageable pageable, String cate) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryContainingAndBoardTitleContaining(cate, kw, pageable);
				
		return boardList;
	}

	public Page<Board> findByContent(String kw, Pageable pageable, String cate) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryContainingAndBoardContentContaining(cate, kw, pageable);

		return boardList;
   	}

	public Page<Board> findByWriter(String kw, Pageable pageable, String cate) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 10;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "id");
		
		Page<Board> boardList = boardRepository.findByBoardCategoryContainingAndBoardWriterContaining(cate, kw, pageable);

		return boardList;
   	}
	
	@Transactional
	public void updateReplyCount(Long id) {
		boardRepository.updateReplyCount(id);		
	}
	
	@Transactional
	public void updateLikeCount(Long id) {
		boardRepository.updateLikeCount(id);		
	}

	public Page<Board> findListAllOrderByVoteCount(Pageable pageable) {
		int page = pageable.getPageNumber() - 1;
		int pageSize = 5;
		pageable = PageRequest.of(page, pageSize, Sort.Direction.DESC, "likeCount");
		
		Page<Board> boardList = boardRepository.findAll(pageable);
		return boardList;
	}

	public Board findNotice() {
		String cate = "notice";
		List<Board> boardList = boardRepository.findByBoardCategoryContaining(cate);
		if (!boardList.isEmpty()) {
	        Board notice = boardList.get(0);
	        return notice;
	    } else {
	        // 빈 페이지 처리 또는 예외 처리
	        return null; // 또는 예외를 throw하여 처리할 수 있음
	    }
	}

	public void deleteByBoardWriter(String memberName) {
		boardRepository.deleteByBoardWriter(memberName);
		
	}


}
