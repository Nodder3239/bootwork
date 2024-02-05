package com.khit.media.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.khit.media.entity.Report;
import com.khit.media.repository.ReportRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReportService {
	private final ReportRepository reportRepository;

	public void save(Report report) {
		reportRepository.save(report);
		
	}

	public List<Report> findByBoardIdAndReporter(Long boardId, String reporter) {
		return reportRepository.findByBoardIdAndReporter(boardId, reporter);
	}

	public void deleteByBoardIdAndReporter(Long boardId, String reporter) {
		reportRepository.deleteByBoardIdAndReporter(boardId, reporter);
		
	}
	
	
}
