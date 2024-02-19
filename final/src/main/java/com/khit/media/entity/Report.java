package com.khit.media.entity;


import com.khit.media.dto.ReportDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "m_report")
@Entity
@Getter
@Setter
@ToString
public class Report {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private Long boardId;
	
	@Column
	private Integer rid;
	
	@Column(length=30, nullable=false)
	private String reporter;
	
	public static Report toSaveReportEntity(ReportDTO reportDTO) {
		Report report = Report.builder()
				.id(reportDTO.getId())
				.boardId(reportDTO.getBoardId())
				.rid(reportDTO.getRid())
				.reporter(reportDTO.getReporter())
				.build();
		return report;
	}
}
