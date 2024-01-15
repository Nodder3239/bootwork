package com.khit.board.dto;

import java.util.Date;

import com.khit.board.entity.Board;

import lombok.Data;

@Data
public class BoardDTO {
	private Long id;
	private String title;
	private String writer;
	private String content;
	private Date createdDate;
	private Date updatedDate;
	
	public static BoardDTO toSaveBoardDTO(Board board) {
		BoardDTO boardDTO = new BoardDTO();
		boardDTO.setTitle(board.getTitle());
		boardDTO.setWriter(board.getWriter());
		boardDTO.setContent(board.getContent());
		boardDTO.setCreatedDate(board.getCreatedDate());
		boardDTO.setUpdatedDate(board.getUpdatedDate());
		return boardDTO;
	}
}
