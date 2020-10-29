package com.soaint.fullstack.taskagenda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soaint.fullstack.taskagenda.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{

}
