import React, { Fragment } from 'react';
import Task from './Task';

const Tasks = ( { title, tasks  } ) => {

    return ( 
        <Fragment>
            <h3 className="py-2">{title}</h3>
            { tasks.length < 1 
              ? (
                <div className="alert alert-secondary" role="alert">
                  No Tasks added.
                </div>
              ) 
              : tasks.map(task => (
                <Task 
                    key={task.id}
                    task={task}
                />
              ))
            }
        </Fragment>
    );
}
 
export default Tasks;