package com.khit.study.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;

import com.khit.study.entity.Board;
import com.khit.study.repository.BoardRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Controller
public class BoardService {
	
	private BoardRepository boardRepository;
	
	public void save(Board board) {
		boardRepository.save(board);
	}

	public List<Board> findAll() {
		//정렬 - 오름차순
		//내림차순 - Sort 클래스 사용
		return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
	}

	public Board findById(Long id) {
		return boardRepository.findById(id).get();
	}

	public void delete(Long id) {
		boardRepository.deleteById(id);
		
	}

	public void update(Board board) {
		board.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
		boardRepository.save(board);
		
	}
}
