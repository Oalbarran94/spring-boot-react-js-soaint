import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addTask, editTaskAction, getTasksAction } from '../actions/taskAction';


const Form = () => {

    //Retrieves information from the store.. Where the app data state relies
    const editTask = useSelector(state => state.editTask)
    const taskToBeUpdated = useSelector(state => state.taskToBeUpdated);

    const [ error, setError ] = useState(false);

    const[task, setTask] = useState({
        taskName: '',
        description: ''
    })

    useEffect( () => {
        if(editTask){
            setTask(taskToBeUpdated);
        }else{
            setTask({
                taskName: '',
                description: ''
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskToBeUpdated])

    const{ taskName, description } = task;

    // Binded to the actions
    const dispatch = useDispatch();

    const saveTask = task => dispatch( addTask(task) );


    /**
     * Update task when input change
     */
    const updateState = (event) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value
        })
    }

    const clean = () => {
        setTask({
            taskName: '',
            description: ''
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( taskName.trim() === '' || description === '') {
            setError(true);
            return;
        }
        setError(false);

        if ( !editTask ) {
            saveTask({
                taskName: taskName,
                description: description
            })
            clean();
        } else {
            dispatch( editTaskAction({
                id: taskToBeUpdated.id,
                taskName: taskName,
                description: description
            }) )
            clean();
        }
    }

    const cancelEdit = () => {
        clean();
    }

    

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-header">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <div className="text-primary">{!editTask ? 'CREATE' : 'EDIT' }</div>
                        <div>
                            {!editTask 
                                ? (
                                    <button className="btn btn-primary btn-sm">Add</button>
                                    
                                ) : (
                                    <Fragment>
                                        <button className="btn btn-primary btn-sm mr-3">Edit</button>
                                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => cancelEdit()}>Cancel</button>
                                    </Fragment>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="card-body">
            
                    <div className="form-group">
                        <input 
                            className="form-control"
                            type="text"
                            name="taskName"
                            placeholder="i.e. Create DB structure."
                            onChange={updateState}
                            value={taskName}
                        />
                    </div>
                    <div className="form-group">
                        <textarea 
                            className="form-control" 
                            name="description" 
                            onChange={updateState}
                            value={description}
                        ></textarea>
                    </div>
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            All fields are required
                        </div>
                    ) : null}
                    
                </div>
            </div>
        </form>

    );
}
 
export default Form;
