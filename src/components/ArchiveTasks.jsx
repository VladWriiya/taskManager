import React from 'react';
import TaskCard from './TaskCard';

const ArchiveTasks = ({ tasks }) => {
    return (
        <div className="container mt-4">
            <h2 className="mb-4">Archived Tasks</h2>
            <div>
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        isCompleted={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArchiveTasks;
