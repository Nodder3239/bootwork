package com.khit.board.test;

import java.sql.Timestamp;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.khit.board.entity.Board;
import com.khit.board.repository.BoardRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
public class QueryMethodTest {
	
	@Autowired
	private BoardRepository boardRepository;
	
	/*
	//테스트 데이터 생성(200개)
	@Test
	@BeforeEach
	public void dataCreate() {
		for(int i=1; i<=200; i++) {
			Board board = new Board();
			board.setBoardTitle("테스트 제목 " + i);
			board.setBoardContent("테스트 내용 " + i);
			board.setBoardWriter("테스터" + i);
			
			boardRepository.save(board);
		}
	}
	*/
	
	
}
