package com.khit.media.dto;

import java.time.LocalDateTime;

import com.khit.media.entity.Board;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class BoardDTO{
	@Id	//기본키(설정 안하면 오류)
	@GeneratedValue(strategy=GenerationType.IDENTITY) //자동 순번
	private Long id;
	
	@Column(nullable=false)
	private String boardTitle;
	
	@Column(unique = true)
	private Integer bid;
	
	@Column(nullable=false)
	private String boardWriter;
	
	@Column(nullable=false)
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
	
	private LocalDateTime createdDate;
	
	private LocalDateTime updatedDate;
	
	public static BoardDTO toSaveBoardDTO(Board board) {
		BoardDTO boardDTO = BoardDTO.builder()
				.id(board.getId())
				.boardTitle(board.getBoardTitle())
				.bid(board.getBid())
				.boardWriter(board.getBoardWriter())
				.boardContent(board.getBoardContent())
				.boardCategory(board.getBoardCategory())
				.boardHits(board.getBoardHits())
				.replyCount(board.getReplyCount())
				.likeCount(board.getLikeCount())
				.reportCount(board.getReportCount())
				.filename(board.getFilename())
				.filepath(board.getFilepath())
				.createdDate(board.getCreatedDate())
				.updatedDate(board.getUpdatedDate())
				.build();
		return boardDTO;
	}
}