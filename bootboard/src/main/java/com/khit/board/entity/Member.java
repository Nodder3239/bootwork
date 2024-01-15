package com.khit.board.entity;

import com.khit.board.dto.MemberDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Table(name = "tbl_member")
@Entity
@Data
public class Member {
	@Id	//기본키(설정 안하면 오류)
	@GeneratedValue(strategy=GenerationType.IDENTITY) //자동 순번
	private Long id;
	
	@Column(unique = true)	//유일성 가짐, 중복 검사
	private String memberEmail;
	
	@Column(nullable=false)	//필수 입력, not null
	private String memberPassword;
	
	@Column(length=30, nullable=false)	//길이 30byte
	private String memberName;
	
	@Column
	private String memberAge;
	
	//dto를 매개로 받아서 entity에 저장하는 메서드 생성
	public static Member toSaveEntity(MemberDTO memberDTO) {
		Member member = new Member();
		member.setMemberEmail(memberDTO.getMemberEmail());
		member.setMemberPassword(memberDTO.getMemberPassword());
		member.setMemberName(memberDTO.getMemberName());
		member.setMemberAge(memberDTO.getMemberAge());
		return member;
	}
	
	//수정용
	public static Member toUpdateEntity(MemberDTO memberDTO) {
		Member member = new Member();
		member.setId(memberDTO.getId());
		member.setMemberEmail(memberDTO.getMemberEmail());
		member.setMemberPassword(memberDTO.getMemberPassword());
		member.setMemberName(memberDTO.getMemberName());
		member.setMemberAge(memberDTO.getMemberAge());
		return member;
	}
}
