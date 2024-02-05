package com.khit.media.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khit.media.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long>{

	List<Report> findByBoardIdAndReporter(Long boardId, String reporter);

	void deleteByBoardIdAndReporter(Long boardId, String reporter);

}
