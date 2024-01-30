package com.khit.media.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.media.entity.Member;

public interface MemberRepository  extends JpaRepository<Member, Long>{

}
