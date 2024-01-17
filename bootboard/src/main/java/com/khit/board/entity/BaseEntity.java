package com.khit.board.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
	
	@CreationTimestamp
	@Column(updatable = false)
	protected LocalDateTime createdDate;	//생성일
	
	@UpdateTimestamp
	@Column(insertable = false)
	protected LocalDateTime updatedDate;	//수정일
}
