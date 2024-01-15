package com.khit.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.board.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long>{
    // 페이징 및 정렬을 위한 메서드
    Page<Board> findAll(Pageable pageable);

    Page<Board> findByTitleContaining(String kw, Pageable pageable);

    Page<Board> findByContentContaining(String kw, Pageable pageable);

    Page<Board> findByWriterContaining(String kw, Pageable pageable);
}
