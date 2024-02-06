package com.khit.media.dto;

import com.khit.media.entity.Report;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ReportDTO {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private Long boardId;
	
	@Column
	private String reporter;
	
	public static ReportDTO toSaveReportDTO(Report report) {
		ReportDTO reportDTO = ReportDTO.builder()
				.id(report.getId())
				.boardId(report.getBoardId())
				.reporter(report.getReporter())
				.build();
		return reportDTO;
	}
}

