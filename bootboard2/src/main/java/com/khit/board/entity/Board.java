package com.khit.board.entity;

import java.util.List;

import com.khit.board.dto.BoardDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString(exclude="member")
@Setter
@Getter
@Builder
@Table(name = "t_board")
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Board extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String title;
	
	@Column(length = 2000, nullable = false)
	private String content;
	
	@Column(columnDefinition = "int default 0")
	private int hits;
	
	
	//Board 엔티티와 연관관계 매핑
	//다대일 매핑
	//fetch는 조회할때 EAGER-전체 조회를 함, LAZY-특정한 조회만 됨)
	//JoinColumn - 외래키 설정
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn
	private Member member;
	
	//1쪽이 board가 주인이 아님
	@OneToMany(mappedBy = "board", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@OrderBy("id desc")
	private List<Reply> replyList;
	
	public static Board toSaveEntity(BoardDTO boardDTO) {
		Board board = Board.builder()
				.id(boardDTO.getId())
				.title(boardDTO.getTitle())
				.content(boardDTO.getContent())
				.hits(boardDTO.getHits())
				.member(boardDTO.getMember())
				.replyList(boardDTO.getReplyList())
				.build();
		return board;
	}
	
	//dto - entity(글 수정 - 이미 글 번호가 존재함으로 꼭 명시함)
	public static Board toUpdateEntity(BoardDTO boardDTO) {
		Board board = Board.builder()
				.id(boardDTO.getId())
				.title(boardDTO.getTitle())
				.content(boardDTO.getContent())
				.hits(boardDTO.getHits())
				.member(boardDTO.getMember())
				.build();
		return board;
	}
}


