package com.khit.media.dto;

import java.time.LocalDateTime;

import com.khit.media.entity.Board;
import com.khit.media.entity.Reply;

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
public class ReplyDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private Long boardId;
	
	@Column
	private String replyer;
	
	@Column
	private String rcontent;
	
	private LocalDateTime createdDate;
	
	private LocalDateTime updatedDate;
	
	
	public static ReplyDTO toSaveReplyDTO(Reply reply) {
		ReplyDTO replyDTO = ReplyDTO.builder()
				.id(reply.getId())
				.boardId(reply.getBoardId())
				.replyer(reply.getReplyer())
				.rcontent(reply.getRcontent())
				.createdDate(reply.getCreatedDate())
				.updatedDate(reply.getUpdatedDate())
				.build();
		return replyDTO;
	}
}
