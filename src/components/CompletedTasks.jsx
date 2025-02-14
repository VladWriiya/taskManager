import React from 'react';
import TaskCard from './TaskCard';

const CompletedTasks = ({ tasks, onArchive }) => {
    return (
        <div>
            <h3 className="mb-3 mt-4">Completed Tasks</h3>
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    isCompleted={true}
                    isArchived={false}
                    onArchive={onArchive}
                />
            ))}
        </div>
    );
};

export default CompletedTasks; 