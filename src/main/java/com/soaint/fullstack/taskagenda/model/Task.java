package com.soaint.fullstack.taskagenda.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class Task {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@ApiModelProperty(notes = "Name of the Task")
	private String taskName;
	
	@ApiModelProperty(notes = "Description of the Task")
	private String description;
	
	@ApiModelProperty(notes = "Creation fo the Task")
	private Date createdDate;
	private boolean isActive;

	public Task(Long id, String taskName, String description, Date createdDate, boolean isActive) {
		super();
		this.id = id;
		this.taskName = taskName;
		this.description = description;
		this.createdDate = createdDate;
		this.isActive = isActive;
	}

	public Task() {
		//no arg constructor
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", taskName=" + taskName + ", description=" + description + ", createdDate="
				+ createdDate + ", isActive=" + isActive + "]";
	}

}
