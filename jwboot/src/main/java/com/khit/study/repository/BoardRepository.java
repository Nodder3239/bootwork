package com.khit.study.repository;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.study.entity.Board;

//JPARepository를 상속해야 함
public interface BoardRepository extends JpaRepository<Board, Long>{
	//쿼리 메서드 연습
	//제목으로 검색
	/*
	List<Board> findByTitle(String searchKeyword);

	List<Board> findByTitleContaining(String kw);
	
	List<Board> findByContentContaining(String kw);

	List<Board> findByWriterContaining(String kw);
	*/
    // 페이징 및 정렬을 위한 메서드
    Page<Board> findAll(Pageable pageable);

    Page<Board> findByTitleContaining(String kw, Pageable pageable);

    Page<Board> findByContentContaining(String kw, Pageable pageable);

    Page<Board> findByWriterContaining(String kw, Pageable pageable);

}
