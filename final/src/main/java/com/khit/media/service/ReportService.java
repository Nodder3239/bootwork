package com.khit.media.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.khit.media.dto.ReportDTO;
import com.khit.media.entity.Report;
import com.khit.media.repository.ReportRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReportService {
	private final ReportRepository reportRepository;

	public void save(ReportDTO reportDTO) {
		Report report = Report.toSaveReportEntity(reportDTO);
		reportRepository.save(report);
		
	}

	public List<ReportDTO> findByBoardIdAndReporter(Long boardId, String reporter) {
		List<Report> reportList =  reportRepository.findByBoardIdAndReporter(boardId, reporter);
		List<ReportDTO> reportDTOList = new ArrayList<>();
		for(Report report : reportList) {
			ReportDTO reportDTO = ReportDTO.toSaveReportDTO(report);
			reportDTOList.add(reportDTO);
		}
		return reportDTOList;
	}
	
	@Transactional
	public void deleteByBoardIdAndReporter(Long boardId, String reporter) {
		reportRepository.deleteByBoardIdAndReporter(boardId, reporter);
		
	}
	
	@Transactional
	public void deleteByBoardId(Long id) {
		reportRepository.deleteByBoardId(id);
		
	}
	
	
}
