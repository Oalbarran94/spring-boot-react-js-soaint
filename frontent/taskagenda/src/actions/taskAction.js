import { types } from "../types/types";
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

/**
 * 
 * dispatch methods are binded to the reducers.
 * It triggers the action with the corresponding action and payload.
 * like 
 * {
 *      type: types.ADD_TASK,
 *      payload: true
 * }
 */

//Action used to create new tasks
export function addTask(task) {
    return async (dispatch) => {
        dispatch( addTaskAction() );

        try {
            await clienteAxios.post('/api/v1/task', task);

           dispatch( addTaskSuccess(task) );

            // Modal information
            Swal.fire(
                'Success', 
                'Task added successfully',
                'success'
            );
            
            dispatch( getTasksAction() )
        } catch (error) {
            dispatch( addTaskError(true) );

            Swal.fire({
                icon: 'error',
                title: 'There has been an error',
                text: 'Try again'
            })
        }
    }
}

const addTaskAction = () => ({
    type: types.ADD_TASK,
    payload: true
});

const addTaskSuccess = task => ({
    type: types.ADD_TASK_SUCCESS,
    payload: task
})

const addTaskError = state => ({
    type: types.ADD_TASK_ERROR,
    payload: state
});


// Retrieves the information
export function getTasksAction() {
    return async (dispatch) => {
        dispatch( getTasks() );

        try {
            const respuesta = await clienteAxios.get('/api/v1/task');
            dispatch( getTaskSuccess(respuesta.data) )
        } catch (error) {
            dispatch( getTasksError() )
        }
    }
}

const getTasks = () => ({
    type: types.GET_TASKS,
    payload: true
});

const getTaskSuccess = tasks => ({
    
    type: types.GET_TASKS_SUCCESS,
    payload: tasks
});

const getTasksError = () => ({
    type: types.GET_TASKS_ERROR, 
    payload: true
});

export function deleteTask(id) {
    return async (dispatch) => {
        dispatch(getTaskToDelete(id) );

        try {
            await clienteAxios.delete(`/api/v1/task/${id}`);
            dispatch( deletedSuccess() );

            Swal.fire(
                'Deleted',
                'Deleted succesfully',
                'success'
            )
        } catch (error) {
            dispatch( deletedError() );
        }
    }
}

const getTaskToDelete = id => ({
    type: types.GET_TASK_TO_DELETE,
    payload: id
});

const deletedSuccess = () => ({
    type: types.DELETED_TASK_SUCCESS
})

const deletedError = () => ({
    type: types.DELETED_TASK_ERROR,
    payload: true
});

export function getTaskToUpdateAction(task) {
    return (dispatch) => {
        dispatch( getTaskToUpdate(task) )
    }
}

const getTaskToUpdate = task => ({
    type: types.GET_TASK_TO_UPDATE,
    payload: task
})

export function editTaskAction(task) {
    return async (dispatch) => {
        dispatch( editTask() );

        try {
            await clienteAxios.put(`/api/v1/task/${task.id}`, task);    
            dispatch( editTaskSuccess(task) );

            dispatch( getTasksAction() );
        } catch (error) {
            dispatch( editTaskError() );
        }
    }
}

const editTask = () => ({
    type: types.EDIT_TASK
});

const editTaskSuccess = task => ({
    type: types.EDIT_TASK_SUCCESS,
    payload: task
});

const editTaskError = () => ({
    type: types.EDIT_TASK_ERROR,
    payload: true
})