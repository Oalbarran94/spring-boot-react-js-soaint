import React, { useEffect  } from 'react';
import Form from './components/Form';
import Tasks from './components/Tasks';

import { useSelector, useDispatch } from 'react-redux';
import { getTasksAction } from './actions/taskAction';


function App() {

  const dispatch = useDispatch();

    useEffect( ()=> {
        const loadTasks = () => dispatch( getTasksAction() );
        loadTasks();
        // eslint-disable-next-line
    }, []);

  const taskss = useSelector( state => state.tasks );

  
  const tasksTodo = taskss.filter(task => task.active === false);
  const tasksDone = taskss.filter(task => task.active === true);

  return (
    
      <div className="container">
        <h1 className="py-4">To-do Tasks</h1>
        <Form />

        <div className="row pt-4">
          <div className="col">
            <Tasks 
              title="To Do" 
              tasks={tasksTodo}
            />
          </div>
          <div className="col">
            <Tasks 
              title="Done"
              tasks={tasksDone}
            />
          </div>
        </div>
      </div>
    
  );
}

export default App;
