import { types } from "../types/types";

const initialState = {
    tasks: [],
    error: null,
    loading: false, 
    taskToBeDeleted: null,
    taskToBeUpdated: null,
    editTask: false,
    messageAction: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function ( state = initialState, action ) {
    switch ( action.type ) {
        case types.ADD_TASK:
        case types.GET_TASKS:
            return {
                ...state,
                loading: action.payload
            }

        case types.GET_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                editTask: false,
                error: null,
                tasks: action.payload
            }

        case types.ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.payload]
            }
        case types.EDIT_TASK_ERROR:
        case types.ADD_TASK_ERROR:
                return {
                    ...state,
                    loading: false,
                    editTask: false,
                    error: action.payload
                }

        case types.SHOW_ALERT:
            return {
                ...state,
                messageAction: action.payload
            }
        case types.HIDE_ALERT:
            return {
                ...state,
                messageAction: null
            }
        case types.GET_TASK_TO_DELETE:
            return {
                ...state,
                taskToBeDeleted: action.payload
            }
        case types.DELETED_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter( task => task.id !== state.taskToBeDeleted ),
                taskToBeDeleted: null
            }

        case  types.GET_TASK_TO_UPDATE:
            return {
                ...state,
                taskToBeUpdated: action.payload,
                editTask: true
            }
        case types.EDIT_TASK_SUCCESS:
            return {
                ...state,
                taskToBeUpdated: null,
                editTask: false,
            }
    
        default:
            return state;
    }
}
