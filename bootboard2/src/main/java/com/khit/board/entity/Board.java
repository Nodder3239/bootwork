package com.khit.board.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude="member")
@Entity
@Table(name = "t_board")
public class Board {
	
	@Id	//기본키(설정 안하면 오류)
	@GeneratedValue(strategy=GenerationType.IDENTITY) //자동 순번
	private Long id;
	
	@Column(nullable=false)
	private String title;
		
	@Column(length=2000, nullable=false)
	private String content;
	
	@CreationTimestamp
	@Column(updatable = false)
	private Timestamp createdDate;	//생성일
	
	@UpdateTimestamp
	@Column(insertable = false)
	private Timestamp updatedDate;	//수정일
	
	//Board 엔티티와 연관관계 매핑
	//다대일 매핑(fetch는 조회할 때 EAGER-전체조회를 함, LAZY-특정한 조회만 됨)
	//JoinColumn() - 외래키(FK) 설정
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="member_id")
	private Member member;


}
