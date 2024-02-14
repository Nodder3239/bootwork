package com.khit.media.entity;

import com.khit.media.dto.BoardDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "m_board")
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
	
	@Column(columnDefinition = "Integer default 0")
	private Integer boardHits;
	
	@Column(columnDefinition = "Integer default 0")
	private Integer replyCount;
	
	@Column(columnDefinition = "Integer default 0")
	private Integer likeCount;
	
	@Column(columnDefinition = "Integer default 0")
	private Integer reportCount;
	
	//write.html에서 name 값과 다른 이름으로 만들 것
	//MultipartFile과 String 타입이 서로 다르므로<
	@Column
	private String filename;
	
	@Column
	private String filepath;
	
	public static Board toSaveBoardEntity(BoardDTO boardDTO) {
		Board board = Board.builder()
				.boardTitle(boardDTO.getBoardTitle())
				.boardWriter(boardDTO.getBoardWriter())
				.boardContent(boardDTO.getBoardContent())
				.boardCategory(boardDTO.getBoardCategory())
				.boardHits(boardDTO.getBoardHits())
				.replyCount(boardDTO.getReplyCount())
				.likeCount(boardDTO.getLikeCount())
				.reportCount(boardDTO.getReportCount())
				.filename(boardDTO.getFilename())
				.filepath(boardDTO.getFilepath())
				.build();
		return board;
	}
	
	public static Board toUpdateBoardEntity(BoardDTO boardDTO) {
		Board board = Board.builder()
				.id(boardDTO.getId())
				.boardTitle(boardDTO.getBoardTitle())
				.boardWriter(boardDTO.getBoardWriter())
				.boardContent(boardDTO.getBoardContent())
				.boardCategory(boardDTO.getBoardCategory())
				.boardHits(boardDTO.getBoardHits())
				.replyCount(boardDTO.getReplyCount())
				.likeCount(boardDTO.getLikeCount())
				.reportCount(boardDTO.getReportCount())
				.filename(boardDTO.getFilename())
				.filepath(boardDTO.getFilepath())
				.build();
		return board;
	}
	
	/*
	public static Board toUpdateNoFileBoardEntity(BoardDTO boardDTO) {
		Board board = Board.builder()
				.id(boardDTO.getId())
				.boardTitle(boardDTO.getBoardTitle())
				.boardWriter(boardDTO.getBoardWriter())
				.boardContent(boardDTO.getBoardContent())
				.boardCategory(boardDTO.getBoardCategory())
				.boardHits(boardDTO.getBoardHits())
				.replyCount(boardDTO.getReplyCount())
				.likeCount(boardDTO.getLikeCount())
				.reportCount(boardDTO.getReportCount())
				.build();
		return board;
	}
	*/
}