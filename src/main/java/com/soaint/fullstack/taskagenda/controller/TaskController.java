package com.soaint.fullstack.taskagenda.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soaint.fullstack.taskagenda.model.Task;
import com.soaint.fullstack.taskagenda.repository.TaskRepository;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;


@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
@RequestMapping("/api/v1")
@Api(value="task", description = "A test description")
public class TaskController {
	
	@Autowired
    private TaskRepository taskRepository;
	
	
	@GetMapping("/task")
	@Operation(summary = "Get all the tasks")
    public List <Task> getAllTasks() {
        return taskRepository.findAll();
    }
	
	@GetMapping("/task/{taskId}")
	@Operation(summary = "Get task by id")
    public ResponseEntity <Task> getEmployeeById(@PathVariable(value = "taskId") Long taskId) throws Exception
    {
		Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new Exception("Task not found for this id :: " + taskId));
        return ResponseEntity.ok().body(task);
    }
	
	@PostMapping("/task")
	@Operation(summary = "Create a task")
    public Task createTask(@RequestBody Task task) {
		task.setCreatedDate(new Date());
		task.setActive(false);
        return taskRepository.save(task);
    }
	
	@PutMapping("/task/{id}")
	@Operation(summary = "Update a task by id")
    public ResponseEntity<Task> updateTask(@PathVariable(value = "id") Long taskId,
        @RequestBody Task taskDetails) throws Exception {
		Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new Exception("Task not found for this id :: " + taskId));
		
		task.setTaskName(taskDetails.getTaskName());
		
		task.setDescription(taskDetails.getDescription());
		task.setActive(taskDetails.isActive());

        final Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }
	
	@DeleteMapping("/task/{id}")
	@Operation(summary = "Delete a task by id")
    public ResponseEntity<String> deleteTask(@PathVariable(value = "id") Long taskId)
    throws Exception {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new Exception("Task not found for this id :: " + taskId));

        taskRepository.delete(task);
        
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

}
