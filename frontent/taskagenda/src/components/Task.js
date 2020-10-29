import React from 'react';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { deleteTask, getTaskToUpdateAction, getTasksAction, editTaskAction } from '../actions/taskAction';

const Task = ({ task }) => {

    const { id, taskName, description, active } = task;

    const dispatch = useDispatch();

    const removeTask = (id) => {
        Swal.fire({
            title: '¿Sure?',
            text: "Task is gonna be deleted",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.value) {
                dispatch( deleteTask(id) );
            }
        });
        dispatch( getTasksAction() );
    }

    const changeStatus = () => {
        dispatch( editTaskAction({
            id: task.id,
            taskName: taskName,
            description: description,
            active: !task.active
        }) )
    }

    const changeColorByStatus = (status) => {
        return {
            class: status ? 'success' : 'info',
            fill: status ? '#28a745' : '#17a2b8'
        }
    }

    const editTask = (task) => {
        dispatch( getTaskToUpdateAction(task) );
    }

    return (  
        <div className={"card border-" + changeColorByStatus(active).class + " mb-3"}>
            <div className={"card-header text-white bg-" + changeColorByStatus(active).class}>{taskName}</div>
            <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                    <div className="p-2">
                        <button type="button" className="btn btn-light mr-3" onClick={() => changeStatus()}>
                        { active 
                            ? (
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check-circle-fill" fill={changeColorByStatus(active).fill} xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            ) : (
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check-circle" fill={changeColorByStatus(active).fill} xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                                </svg>
                            )
                        }
                        </button>
                    </div>
                    <div className="p-2">
                        <p className="card-text">{description}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer bg-transparent">
                <button type="button" className="btn btn-danger btn-sm float-right" onClick={() => removeTask(id)  }>Delete</button>
                <button type="button" className="btn btn-outline-dark btn-sm mr-3 float-right" onClick={() => editTask(task)}>Edit</button>
            </div>
        </div>
    );
}
 
export default Task;