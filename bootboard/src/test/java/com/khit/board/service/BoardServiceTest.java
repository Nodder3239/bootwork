package com.khit.board.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.khit.board.dto.BoardDTO;

@SpringBootTest
public class BoardServiceTest {
	@Autowired
	private BoardService boardService;
	
	/*
	@Test
	void testInsertBoard() {
		for(int i=1; i<=256; i++){
			BoardDTO boardDTO = new BoardDTO();
			boardDTO.setBoardTitle("테스트 제목 " + i);
			boardDTO.setBoardContent("테스터" + i);
			boardDTO.setBoardWriter("테스터");
			boardDTO.setBoardHits(i);
			
			boardService.save(boardDTO);
		}
	}
	*/
}
