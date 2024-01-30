package com.khit.media.service;

import org.springframework.stereotype.Service;

import com.khit.media.entity.Member;
import com.khit.media.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	
	private final MemberRepository memberRepository;

	public void delete(Long id) {
		memberRepository.deleteById(id);
	}


	public Member findById(Long id) {
		return memberRepository.findById(id).get();
	}
}
