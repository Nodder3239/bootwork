package com.khit.study.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.study.entity.Board;

//JPARepository를 상속해야 함
public interface BoardRepository extends JpaRepository<Board, Long>{
	//쿼리 메서드 연습
	//제목으로 검색
	List<Board> findByTitle(String searchKeyword);

	List<Board> findByTitleContaining(String kw);
	
	List<Board> findByContentContaining(String kw);

	List<Board> findByWriterContaining(String kw);

	List<Board> findByContentContainingOrContentContaining(String string, String string2);
}
