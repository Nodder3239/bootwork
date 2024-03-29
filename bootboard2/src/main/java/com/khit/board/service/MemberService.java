package com.khit.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;

import com.khit.board.config.SecurityUser;
import com.khit.board.dto.MemberDTO;
import com.khit.board.entity.Member;
import com.khit.board.entity.Role;
import com.khit.board.exception.BootBoardException;
import com.khit.board.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MemberService {
	
	private final MemberRepository memberRepository;
	
	private final PasswordEncoder pwEncoder;

	public void insert(MemberDTO memberDTO) {		
		//1.비밀번호 암호화
		String encPw = pwEncoder.encode(memberDTO.getPassword());
		memberDTO.setPassword(encPw);
		//2.권한 설정
		memberDTO.setRole(Role.MEMBER);
		//3.DTO -> entity 변환 메서드
		Member member = Member.toSaveEntity(memberDTO);
		memberRepository.save(member);
		
	}

	public List<MemberDTO> findAll() {
		//db에서 member 엔티티를 꺼내와서 
		List<Member> memberList = memberRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		
		List<MemberDTO> memberDTOList = new ArrayList<>();
		
		for(Member member : memberList) {
			MemberDTO memberDTO = MemberDTO.toSaveDTO(member);
			memberDTOList.add(memberDTO);
		}
		
		//컨트롤러에 DTO를 보냄
		return memberDTOList;
	}
	


	public MemberDTO findById(Long id) {
		//db에서 member 1건 꺼내옴 - findById(id).get();
		//id가 없을때 오류 처리 - "url을 찾을 수 없습니다."
		Optional<Member> findMember = memberRepository.findById(id);
		if(findMember.isPresent()) {
			MemberDTO memberDTO = MemberDTO.toSaveDTO(findMember.get());
			return memberDTO;
		}else {
			throw new BootBoardException("페이지를 찾을 수 없습니다.");
		}
	}

	public void delete(Long id) {
		memberRepository.deleteById(id);
		
	}

	public void update(MemberDTO memberDTO) {
		//암호화, 권한 설정
		String encPw = pwEncoder.encode(memberDTO.getPassword());
		memberDTO.setPassword(encPw);
		memberDTO.setRole(Role.MEMBER);
		
		//변환
		Member member = Member.toSaveUpdate(memberDTO);
		memberRepository.save(member);		
	}

	public Member login(Member member) {
		// 1. 이메일로 회원 조회(일반적으로 아이디와 비밀번호)
		Optional<Member> findMember = memberRepository.findByMemberId(member.getMemberId());
		if(findMember.isPresent()) {
			//조회 결과 있음 - 1건 가져옴			
			return findMember.get();
			
		}else {
			return null;
		}
	}

	public String checkId(String memberId) {
		Optional<Member> member = memberRepository.findByMemberId(memberId);
		if(member.get() == null) {	//DB에 저장된 객체가 없으면
			return "OK";	//사용가능
		}
		return "NO";	//사용불가
	}

	public Member findByMemberId(String memberId) throws Exception {
		//db에서 이메일로 검색한 회원 객체 가져오고
		Optional<Member> member = memberRepository.findByMemberId(memberId);
		return member.get();
	}
	
	public MemberDTO findByMemberId(SecurityUser principal) {
		Optional<Member> member = memberRepository.findByMemberId(principal.getUsername());
		//변환
		MemberDTO memberDTO = MemberDTO.toSaveDTO(member.get());
		return memberDTO;
	}


}
