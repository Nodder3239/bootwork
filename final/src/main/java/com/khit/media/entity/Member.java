package com.khit.media.entity;

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
@Table(name = "tbl_board")
@Entity
@Getter
@Setter
@ToString
public class Member{
	
	@Id  //PK(기본키)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	   
	@Column(unique = true)
	private String memberEmail;
	   
	@Column(nullable = false)
	private String memberPassword;
	   
	@Column(length = 30, nullable = false)
	private String memberName;
	   
	@Column
	private int memberAge;
	   
	@Column
	private String memberArea;
	
	@Column
	private String memberRole;
}