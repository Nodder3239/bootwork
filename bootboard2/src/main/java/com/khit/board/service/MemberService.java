package com.khit.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;

import com.khit.board.entity.Member;
import com.khit.board.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MemberService {
	
	private final MemberRepository memberRepository;

	public void insert(Member member) {		
		//db 안으로 저장(entity를 저장해야함)
		memberRepository.save(member);
		
	}

	public List<Member> findAll() {
		//db에서 member 엔티티를 꺼내와서 
		List<Member> memberList = memberRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		
		//컨트롤러에 DTO를 보냄
		return memberList;
	}
	


	public Member findById(Long id) {
		//db에서 member 1건 꺼내옴 - findById(id).get();
		//id가 없을때 오류 처리 - "url을 찾을 수 없습니다."
		Member member = memberRepository.findById(id).get();

		return member;

	}

	public void delete(Long id) {
		memberRepository.deleteById(id);
		
	}

	public void update(Member member) {
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

	public Member findByMemberId(String memberId) {
		//db에서 이메일로 검색한 회원 객체 가져오고
		Optional<Member> member = memberRepository.findByMemberId(memberId);
		return member.get();
	}



}
