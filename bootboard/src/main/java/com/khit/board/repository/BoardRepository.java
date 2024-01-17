package com.khit.board.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.khit.board.entity.Board;

import jakarta.transaction.Transactional;

public interface BoardRepository extends JpaRepository<Board, Long>{
    // 페이징 및 정렬을 위한 메서드
	/*
    Page<Board> findAll(Pageable pageable);

    Page<Board> findByBoardTitleContaining(String kw, Pageable pageable);

    Page<Board> findByBoardContentContaining(String kw, Pageable pageable);

    Page<Board> findByBoardWriterContaining(String kw, Pageable pageable);
    */
    
	//List<Board> findByBoardTitleContaining(String kw, Sort sort);

    List<Board> findByBoardTitleContainingOrderByIdDesc(String kw, Pageable pageable);
    
    List<Board> findByBoardContentContainingOrderByIdDesc(String kw, Pageable pageable);

    List<Board> findByBoardWriterContainingOrderByIdDesc(String kw, Pageable pageable);

    @Modifying
    @Query(value="update Board b set b.boardHits=b.boardHits+1 where b.id=:id")
	public void updateHits(Long id);
    
    @Modifying
    @Query(value="update Board b set b.boardHits=b.boardHits-1 where b.id=:id")
	public void updateHits2(Long id);

}
