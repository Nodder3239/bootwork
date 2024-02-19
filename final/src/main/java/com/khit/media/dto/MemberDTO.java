package com.khit.media.dto;


import com.khit.media.entity.Member;
import com.khit.media.entity.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MemberDTO {
	
	private Integer id;
	
	//아이디는 5자~20자로 입력
	@Size(min=5, max=20)
	@NotEmpty(message = "사용자 ID는 필수 항목입니다.")
	private String memberId;
	
	@NotEmpty(message = "비밀번호는 필수 항목입니다.")
	private String password;
	
	@NotEmpty(message = "이름은 필수 항목입니다.")
	private String name;
	
	@NotEmpty(message = "이메일은 필수 항목입니다.")
	@Email(message = "이메일 형식으로 입력하세요.")
	private String memberEmail;
	
	@NotEmpty(message = "나이는 필수 항목입니다.")
	private String memberAge;
	
	@NotEmpty(message = "전화번호는 필수 항목입니다.")
	private String mnumber;
	   
	@NotEmpty(message = "지역은 필수 항목입니다.")
	private String memberArea;
	
	private Role role;
	
	private String filename;
	private String filepath;
	
	//entity(model<db>에 저장됨) -> dto(view로 보기)로 변환
	//목록보기, 상세보기
	public static MemberDTO toSaveDTO(Member member) {
		MemberDTO memberDTO = MemberDTO.builder()
				.id(member.getId())
				.memberId(member.getMemberId())
				.password(member.getPassword())
				.name(member.getName())
				.memberEmail(member.getMemberEmail())
				.memberAge(member.getMemberAge())
				.mnumber(member.getMnumber())
				.memberArea(member.getMemberArea())				
				.role(member.getRole())
				.filename(member.getFilename())
				.filepath(member.getFilepath())
				.build();
		
		return memberDTO;
	}


}