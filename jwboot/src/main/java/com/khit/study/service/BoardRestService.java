package com.khit.study.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;

import com.khit.study.entity.Board;
import com.khit.study.entity.BoardVO;

@Controller
public class BoardRestService {
	
	/*
	//상세 보기
	public BoardVO getBoard() {
		//게시글 1건 생성
		BoardVO board = new BoardVO();
		board.setId(1);
		board.setTitle("제목");
		board.setWriter("작성자");
		board.setContent("내용입니다.");
		board.setCreatedDate(new Date());
		return board;
	}
	
	//목록 보기
	public List<BoardVO> getBoardList(){
		List<BoardVO> boardList = new ArrayList<>();
		for(int i= 1; i<=10; i++) {
			BoardVO board = new BoardVO();
			board.setId(i);
			board.setTitle("제목" + i);
			board.setWriter("작성자" + i);
			board.setContent(i + "번째 내용입니다.");
			board.setCreatedDate(new Date());
			boardList.add(board);
		}
		return boardList;
	}

	*/
}
