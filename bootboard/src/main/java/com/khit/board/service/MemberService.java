package com.khit.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;

import com.khit.board.dto.MemberDTO;
import com.khit.board.entity.Member;
import com.khit.board.exception.BootBoardException;
import com.khit.board.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@AllArgsConstructor
@RequiredArgsConstructor
@Controller
public class MemberService {
	
	private final MemberRepository memberRepository;

	public void insert(MemberDTO memberDTO) {		
		//db 안으로 저장(entity를 저장해야함)
		//dto를 entity로 변환 메서드 필요
		Member member = Member.toSaveEntity(memberDTO);
		memberRepository.save(member);
		
	}

	public List<MemberDTO> findAll() {
		//db에서 member 엔티티를 꺼내와서 
		List<Member> memberList = memberRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		
		//변환 메서드가 필요
		//member를 담을 빈 DTO리스트를 생성
		List<MemberDTO> memberDTOList = new ArrayList<>();
		
		for(Member member : memberList) {
			MemberDTO memberDTO = MemberDTO.toSaveDTO(member);
			memberDTOList.add(memberDTO);
		}		
		//컨트롤러에 DTO를 보냄
		return memberDTOList;
	}
	
	/*
	public Member login(MemberDTO memberDTO) {
		Member member = Member.toSaveEntity(memberDTO);
		return memberRepository.findByMemberEmailAndMemberPassword(member.getMemberEmail(), member.getMemberPassword());
	}
	*/

	public MemberDTO findById(Long id) {
		//db에서 member 1건 꺼내옴 - findById(id).get();
		//id가 없을때 오류 처리 - "url을 찾을 수 없습니다."
		Optional<Member> member = memberRepository.findById(id);
		if(member.isPresent()) {
			MemberDTO memberDTO = MemberDTO.toSaveDTO(member.get());
			return memberDTO;
		}else
			throw new BootBoardException("찾는 데이터가 없습니다.");
		
	}

	public void delete(Long id) {
		memberRepository.deleteById(id);
		
	}

	public void update(MemberDTO memberDTO) {
		//save가 가입, 수정되는데 가입할 때는 id가 없음, 수정할 때는 id 있어서 중복
		Member member = Member.toUpdateEntity(memberDTO);
		//id가 있는 엔티티의 메서드가 필요하다
		memberRepository.save(member);		
	}
	/*
	public String checkEmail(String memberEmail) {
		Member member = memberRepository.findByMemberEmail(memberEmail);
		if(member == null) {	//DB에 저장된 객체가 없으면
			return "usable";	//사용가능
		}
		return "not_usable";	//사용불가
	}
	*/
	public MemberDTO login(MemberDTO memberDTO) {
		// 1. 이메일로 회원 조회(일반적으로 아이디와 비밀번호)
		Optional<Member> memberEmail = memberRepository.findByMemberEmail(memberDTO.getMemberEmail());
		if(memberEmail.isPresent()) {
			//조회 결과 있음 - 1건 가져옴
			Member member = memberEmail.get();
			//비밀 번호 일치
			if(member.getMemberPassword().equals(memberDTO.getMemberPassword())) {
				//entity -> dto로 변환
				MemberDTO dto = MemberDTO.toSaveDTO(member);
				return dto;
			}else {
				//비밀번호 불일치
			return null;
			}
			
		}else {
			return null;
		}
	}

	public String checkEmail(String memberEmail) {
		Optional<Member> member = memberRepository.findByMemberEmail(memberEmail);
		if(member.isEmpty()) {	//DB에 저장된 객체가 없으면
			return "OK";	//사용가능
		}
		return "NO";	//사용불가
	}

	public MemberDTO findByMemberEmail(String email) {
		//db에서 이메일로 검색한 회원 객체 가져오고
		Member member = memberRepository.findByMemberEmail(email).get();
		//회원 객체(엔티티)를 dto로 변환
		MemberDTO memberDTO = MemberDTO.toSaveDTO(member);
		return memberDTO;
	}



}
