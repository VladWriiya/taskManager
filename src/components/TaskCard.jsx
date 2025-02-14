import React from 'react';

const getPriorityLabel = (priority) => {
    switch(priority) {
        case 1: return { text: "High Priority", class: "text-danger" };
        case 2: return { text: "Medium Priority", class: "text-warning" };
        case 3: return { text: "Low Priority", class: "text-success" };
        default: return { text: "Medium Priority", class: "text-warning" };
    }
};

const TaskCard = ({ task, onComplete, onArchive, isCompleted, isArchived }) => {
    const priorityInfo = getPriorityLabel(task.priority);
    
    return (
        <div className={`card mb-3 shadow-sm ${isCompleted ? 'bg-light' : ''}`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <h3 className="card-title">{task.title}</h3>
                    <span className={`badge ${priorityInfo.class}`}>
                        {priorityInfo.text}
                    </span>
                </div>
                <p className="card-text"><strong>Assignee:</strong> {task.assignee}</p>
                <p className="card-text"><strong>Description:</strong> {task.description}</p>
                <p className="card-text"><strong>Deadline:</strong> {task.deadline}</p>
                <p className="card-text"><strong>Status:</strong> {task.status || "Not Completed"}</p>
                <div className="d-flex gap-2">
                    {!isCompleted && (
                        <button className="btn btn-outline-secondary" onClick={() => onComplete(task.id)}>
                            Mark as Completed
                        </button>
                    )}
                    {isCompleted && !isArchived && onArchive && (
                        <button className="btn btn-outline-primary" onClick={() => onArchive(task.id)}>
                            Move to Archive
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard; 