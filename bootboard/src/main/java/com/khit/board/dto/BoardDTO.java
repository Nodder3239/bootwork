package com.khit.board.dto;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import com.khit.board.entity.Board;
import com.khit.board.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class BoardDTO {
	private Long id;
	private String boardTitle;
	private String boardWriter;
	private String boardContent;
	private Integer boardHits;
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
	
	public static BoardDTO toSaveBoardDTO(Board board) {
		/*
		BoardDTO boardDTO = new BoardDTO();
		boardDTO.setId(board.getId());
		boardDTO.setBoardTitle(board.getBoardTitle());
		boardDTO.setBoardWriter(board.getBoardWriter());
		boardDTO.setBoardContent(board.getBoardContent());
		boardDTO.setBoardHits(board.getBoardHits());
		boardDTO.setCreatedDate(board.getCreatedDate());
		boardDTO.setUpdatedDate(board.getUpdatedDate());
		return boardDTO;
		*/
		//entity -> dto로 변환할 정적 메서드
		//db에 있는 모든 칼럼을 가져옴
		BoardDTO boardDTO = BoardDTO.builder()
				.id(board.getId())
				.boardTitle(board.getBoardTitle())
				.boardWriter(board.getBoardWriter())
				.boardContent(board.getBoardContent())
				.boardHits(board.getBoardHits())
				.createdDate(board.getCreatedDate())
				.updatedDate(board.getUpdatedDate())
				.build();
		return boardDTO;
				 
	}
}
