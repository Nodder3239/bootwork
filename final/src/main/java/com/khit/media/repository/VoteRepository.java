package com.khit.media.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.khit.media.entity.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long>{

	List<Vote> findByBoardIdAndVid(Long boardId, Integer vid);
	
	@Modifying
	void deleteByBoardIdAndVid(Long boardId, Integer vid);
	
	@Modifying
	void deleteByBoardId(Long id);
	
	@Modifying
	void deleteByVid(Integer vid);
	

}
