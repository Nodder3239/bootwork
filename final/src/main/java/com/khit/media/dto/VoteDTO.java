package com.khit.media.dto;

import com.khit.media.entity.Vote;

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
public class VoteDTO {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private Long boardId;
	
	@Column
	private Integer vid;
	
	@Column
	private String voter;
	
	public static VoteDTO toSaveVoteDTO(Vote vote) {
		VoteDTO voteDTO = VoteDTO.builder()
				.id(vote.getId())
				.boardId(vote.getBoardId())
				.vid(vote.getVid())
				.voter(vote.getVoter())
				.build();
		return voteDTO;
	}
}
