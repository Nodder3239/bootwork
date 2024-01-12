package com.khit.study.entity;

import java.util.Date;

import lombok.Data;

@Data
public class BoardVO {
	private Long id;
	private String title;
	private String writer;
	private String content;
	private Date createdDate;
	private Date updatedDate;
}
