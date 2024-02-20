package com.khit.media.entity;

import com.khit.media.dto.ReplyDTO;

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
@Table(name = "m_reply")
@Entity
@Getter
@Setter
@ToString
public class Reply extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private Long boardId;
	
	@Column
	private Integer rid;
	
	@Column(length=30, nullable=false)
	private String replyer;
	
	@Column(length = 200, nullable = false)
	private String rcontent;
	
	public static Reply toSaveReplyEntity(ReplyDTO replyDTO) {
		Reply reply = Reply.builder()
				.boardId(replyDTO.getBoardId())
				.rid(replyDTO.getRid())
				.replyer(replyDTO.getReplyer())
				.rcontent(replyDTO.getRcontent())
				.build();
		return reply;
	}
	
	public static Reply toUpdateReplyEntity(ReplyDTO replyDTO) {
		Reply reply = Reply.builder()
				.id(replyDTO.getId())
				.boardId(replyDTO.getBoardId())
				.rid(replyDTO.getRid())
				.replyer(replyDTO.getReplyer())
				.rcontent(replyDTO.getRcontent())
				.build();
		return reply;
	}
}
