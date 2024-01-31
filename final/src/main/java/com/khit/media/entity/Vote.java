package com.khit.media.entity;

import com.khit.media.dto.VoteDTO;

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
@Table(name = "m_vote")
@Entity
@Getter
@Setter
@ToString
public class Vote {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private Long boardId;
	
	@Column(length=30, nullable=false)
	private String voter;
	
	public static Vote toSaveVoteEntity(VoteDTO voteDTO) {
		Vote vote = Vote.builder()
				.boardId(voteDTO.getBoardId())
				.voter(voteDTO.getVoter())
				.build();
		return vote;
	}
}
