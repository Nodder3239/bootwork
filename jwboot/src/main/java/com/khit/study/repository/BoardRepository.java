package com.khit.study.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.study.entity.Board;

//JPARepository를 상속해야 함
public interface BoardRepository extends JpaRepository<Board, Long>{


}
