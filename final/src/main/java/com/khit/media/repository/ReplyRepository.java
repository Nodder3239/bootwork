package com.khit.media.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.media.entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long>{

	List<Reply> findByBoardId(Long boardId);

}
