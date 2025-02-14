import React from 'react';
import TaskCard from './TaskCard';

const ActiveTasks = ({ tasks, onComplete }) => {
    return (
        <div>
            <h3 className="mb-3">Active Tasks</h3>
            {tasks.map(task => (
                <TaskCard
                    task={task}
                    onComplete={onComplete}
                    isCompleted={false}
                />
            ))}
        </div>
    );
};

export default ActiveTasks; 