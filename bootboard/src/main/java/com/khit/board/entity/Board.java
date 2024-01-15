package com.khit.board.entity;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.khit.board.dto.BoardDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "tbl_board")
@Entity
@Data
public class Board {
	@Id	//기본키(설정 안하면 오류)
	@GeneratedValue(strategy=GenerationType.IDENTITY) //자동 순번
	private Long id;
	
	@Column(length=400, nullable=false)
	private String title;
	
	@Column(length=30, nullable=false)
	private String writer;
	
	@Column(length=4000, nullable=false)
	private String content;
	
	@CreationTimestamp	//현재 날짜와 시간 자동 생성
	private Date createdDate;
	
	private Date updatedDate;
	
	public static Board toSaveBoardEntity(BoardDTO boardDTO) {
		Board board = new Board();
		board.setTitle(boardDTO.getTitle());
		board.setWriter(boardDTO.getWriter());
		board.setContent(boardDTO.getContent());
		board.setCreatedDate(boardDTO.getCreatedDate());
		board.setUpdatedDate(boardDTO.getUpdatedDate());
		return board;
	}
	
	public static Board toUpdateBoardEntity(BoardDTO boardDTO) {
		Board board = new Board();
		board.setId(boardDTO.getId());
		board.setTitle(boardDTO.getTitle());
		board.setWriter(boardDTO.getWriter());
		board.setContent(boardDTO.getContent());
		board.setCreatedDate(boardDTO.getCreatedDate());
		board.setUpdatedDate(boardDTO.getUpdatedDate());
		return board;
	}
}

