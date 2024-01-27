package com.khit.media.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.media.entity.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long>{

	List<Vote> findByBoardIdAndVoter(Long boardId, String voter);

	void deleteByBoardIdAndVoter(Long boardId, String voter);

	void deleteByBoardId(Long id);

}
