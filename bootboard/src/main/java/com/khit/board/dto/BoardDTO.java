package com.khit.board.dto;

import java.time.LocalDateTime;

import com.khit.board.entity.Board;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
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
	
	@NotEmpty(message = "제목은 필수 항목입니다.")
	@Size(max=255)
	private String boardTitle;
	
	@NotEmpty(message = "작성자는 필수 항목입니다.")
	@Size(max=30)
	private String boardWriter;
	
	@NotEmpty(message = "내용은 필수 항목입니다.")
	@Size(max=2000)
	private String boardContent;
	
	private String boardCategory;
	private Integer boardHits;
	private String filename;
	private String filepath;
	
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
				.boardCategory(board.getBoardCategory())
				.boardHits(board.getBoardHits())
				.filename(board.getFilename())
				.filepath(board.getFilepath())
				.createdDate(board.getCreatedDate())
				.updatedDate(board.getUpdatedDate())
				.build();
		return boardDTO;
				 
	}






}
