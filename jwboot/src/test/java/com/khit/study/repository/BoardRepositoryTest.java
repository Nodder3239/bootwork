package com.khit.study.repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.khit.study.entity.Board;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
public class BoardRepositoryTest {
	
	@Autowired
	private BoardRepository boardRepository;
	
	//게시글 생성
	/*
	@Test
	public void insertBoard() {
		/*
		Board board = new Board();
		board.setId(1);
		board.setTitle("제목");
		board.setWriter("작성자");
		board.setContent("내용입니다.");
		board.setCreatedDate(new Timestamp(System.currentTimeMillis()));
		*/
	/*
	Board board = Board.builder()
				.title("제목3")
				.writer("작성자3")
				.content("내용입니다.3")
				.createdDate(new Timestamp(System.currentTimeMillis()))
				.build();
		
		//db에 저장
		boardRepository.save(board);
	}
	
	*/
	/*
	@Test
	public void getBoardList() {
		//db의 게시글 목록 가져오기
		List<Board> boardList = boardRepository.findAll();
		
		//boardList 출력
		/*
		for(Board board : boardList) {
			log.info(board.toString());
		}
		*/
	/*
		//람다식
		boardList.forEach(board -> log.info(board.toString()));
	}
	
	//1건 상세보기
	@Test
	public void getBoard() {
		//findById()와 get()을 사용
		Board board = boardRepository.findById(1);
		log.info(board.toString());
	}
	
	//수정하기
	@Test
	public void updateBoard() {
		//수정하려는 게시글을 가져와서(findById) 수정 처리(save)
		Board board = boardRepository.findById(2);
		board.setTitle("제목2 수정");
		board.setContent("내용2 수정입니다.");
		
		boardRepository.save(board);
	}
	//삭제하기
	@Test
	public void deleteBoard() {
		//3번 게시글 삭제
		boardRepository.deleteById(3);
	}
	*/
		
	/*
	@Test
	public void testFindByTitleContainingOrderByIdDesc() {
		List<Board> boardList = boardRepository.findByBoardContentContainingOrderByIdDesc("10");
		
		for(Board board : boardList) {
			log.info(board.toString());
		}
	}
	*/
	
	/*
	@Test
	public void testFindByTitleContaining() {
		//0 -> 1페이지
		Pageable paging = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "id"));
		log.info("page: " + paging.getPageNumber());
		log.info("size: " + paging.getPageSize());
		
		List<Board> boardList =
				boardRepository.findByTitleContaining("제목", paging);
		
		boardList.forEach(board -> log.info(board.toString()));
	}
	*/
	@Test
	public void testJpaPaging() {
		Pageable paging = PageRequest.of(0, 10, Sort.Direction.DESC, "id");
		
		Page<Board> pageInfo = 
				boardRepository.findByTitleContaining("제목", paging);
		
		//number(페이지 번호), totalPages, totalElements, content
		log.info("페이지번호=" + pageInfo.getNumber());
		log.info("게시글 수=" + pageInfo.getSize());
		log.info("게시글 총 개수=" + pageInfo.getTotalElements());
		log.info("게시글 총 페이지 수=" + pageInfo.getTotalPages());
		
		List<Board> boardList = pageInfo.getContent();
		
		for(Board board : boardList) {
			log.info(board.toString());
		}
	}
	
	
}
