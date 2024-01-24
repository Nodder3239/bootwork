package com.khit.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.khit.board.entity.Board;

//JpaRepository에게 상속 받음
public interface BoardRepository extends JpaRepository<Board, Long>{
    Page<Board> findByTitleContaining(String kw, Pageable pageable);
    
    Page<Board> findByContentContaining(String kw, Pageable pageable);
    
    Page<Board> findByMemberMemberIdContaining(String kw, Pageable pageable);
    
    @Modifying
    @Query(value="delete from Board where id=:id")
    void deleteById(Long id);
    
    @Modifying
    @Query(value="update Board b set b.hits=b.hits+1 where b.id=:id")
	public void updateHits(Long id);
    
    @Modifying
    @Query(value="update Board b set b.hits=b.hits-1 where b.id=:id")
	public void updateHits2(Long id);
}
