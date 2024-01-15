package com.khit.board.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.board.entity.Member;

//JPARepository를 상속해야 함
public interface MemberRepository extends JpaRepository<Member, Long>{
	//제공된 메서드 
		
	Member findByMemberEmailAndMemberPassword(String memberEmail, String memberPassword);

	//Member findByMemberEmail(String memberEmail);

	Optional<Member> findByMemberEmail(String memberEmail);

}
