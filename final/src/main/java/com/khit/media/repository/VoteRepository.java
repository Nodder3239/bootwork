package com.khit.media.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.khit.media.entity.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long>{

	List<Vote> findByBoardIdAndVoter(Long boardId, String voter);
	
	@Modifying
	void deleteByBoardIdAndVoter(Long boardId, String voter);
	
	@Modifying
	void deleteByBoardId(Long id);
	
	@Modifying
	void deleteByVoter(String name);

}
