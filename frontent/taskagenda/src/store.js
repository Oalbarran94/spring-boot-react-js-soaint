import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import taskReducer from './reducers/taskReducers';

/**
 * Configuration to be used by redux. 
 * Also, it makes available redux devtools in chrome
 */
const store = createStore(
    taskReducer, 
    compose( applyMiddleware(thunk), 

        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? 
                window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;