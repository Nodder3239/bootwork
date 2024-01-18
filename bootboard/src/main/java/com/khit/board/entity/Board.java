package com.khit.board.entity;

import java.time.LocalDateTime;
import java.util.Date;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.khit.board.dto.BoardDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tbl_board")
@Entity
@Getter
@Setter
@ToString
public class Board extends BaseEntity{
	@Id	//기본키(설정 안하면 오류)
	@GeneratedValue(strategy=GenerationType.IDENTITY) //자동 순번
	private Long id;
	
	@Column(length=400, nullable=false)
	private String boardTitle;
	
	@Column(length=30, nullable=false)
	private String boardWriter;
	
	@Column(length=4000, nullable=false)
	private String boardContent;
	
	@Column
	private String boardCategory;
	
	@Column
	private Integer boardHits;
	
	/*
	@CreationTimestamp	//현재 날짜와 시간 자동 생성
	private Date createdDate;
	
	@Column
	private Date updatedDate;
	*/
	

	public static Board toSaveBoardEntity(BoardDTO boardDTO) {
		Board board = new Board();
		board.setBoardTitle(boardDTO.getBoardTitle());
		board.setBoardWriter(boardDTO.getBoardWriter());
		board.setBoardContent(boardDTO.getBoardContent());
		board.setBoardCategory(boardDTO.getBoardCategory());
		board.setBoardHits(0);
		return board;
	}
	

	public static Board toUpdateBoardEntity(BoardDTO boardDTO) {
		Board board = new Board();
		board.setId(boardDTO.getId());
		board.setBoardTitle(boardDTO.getBoardTitle());
		board.setBoardWriter(boardDTO.getBoardWriter());
		board.setBoardContent(boardDTO.getBoardContent());
		board.setBoardCategory(boardDTO.getBoardCategory());
		board.setBoardHits(boardDTO.getBoardHits());
		return board;
	}
}

