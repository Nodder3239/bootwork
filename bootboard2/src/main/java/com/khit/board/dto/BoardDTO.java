package com.khit.board.dto;


import java.sql.Timestamp;
import java.util.List;

import com.khit.board.entity.Board;
import com.khit.board.entity.Member;
import com.khit.board.entity.Reply;

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
public class BoardDTO {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String title;
	
	@Column(length = 2000, nullable = false)
	private String content;
	
	@Column(columnDefinition = "int default 0")
	private int hits;

	private Member member;
	
	private List<Reply> replyList;
	
	private Timestamp createdDate;
	
	private Timestamp updatedDate;
	
	//entity -> dto로 변환
	public static BoardDTO toSaveDTO(Board board) {
		BoardDTO boardDTO = BoardDTO.builder()
				.id(board.getId())
				.title(board.getTitle())
				.content(board.getContent())
				.hits(board.getHits())
				.member(board.getMember())
				.replyList(board.getReplyList())
				.createdDate(board.getCreatedDate())
				.updatedDate(board.getUpdatedDate())
				.build();
		return boardDTO;
				
	}
}
