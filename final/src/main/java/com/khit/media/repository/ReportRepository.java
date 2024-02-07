package com.khit.media.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.khit.media.dto.ReportDTO;
import com.khit.media.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long>{

	List<Report> findByBoardIdAndReporter(Long boardId, String reporter);
	
	@Modifying
	void deleteByBoardIdAndReporter(Long boardId, String reporter);
	
	@Modifying
	void deleteByBoardId(Long id);

	@Modifying
	void deleteByReporter(String reporter);

}
