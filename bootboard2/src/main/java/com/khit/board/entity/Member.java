package com.khit.board.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "t_member")
@ToString(exclude="boardList") //순환참조 방지
public class Member {
	
	@Id		//필수 입력 - PK
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	//회원번호
	
	@Column(unique = true)
	private String memberId;	//아이디
	
	@Column(nullable = false)
	private String password;	//비밀번호
	
	@Column(nullable = false, length = 30)
	private String name;		//이름
	
	//@Column
	//private String role;	//권한
	@Enumerated(EnumType.STRING)
	private Role role;
	
	//Board와 관계 매핑
	//주인 설정(다 쪽이 주인)
	//cascade : 참조 객체가 삭제되면 참조하는 객체도 삭제됨
	@OneToMany(mappedBy="member", /*fetch = FetchType.LAZY,*/ 
			cascade = CascadeType.ALL)
	private List<Board> boardList = new ArrayList<>();

	
}
