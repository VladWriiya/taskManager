import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firebase } from './firebase';

import TaskCard from './components/TaskCard';

const ArchiveList = () => {
    const [archivedTasks, setArchivedTasks] = useState([]);
    
    const db = collection(firebase, "task_form");

    const getArchivedTasks = async () => {
        try {
            const data = await getDocs(db);
            const tasksData = data.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                .filter(task => task.status === "Archived");
            setArchivedTasks(tasksData);
        } catch (e) {
            alert("Error getting archived tasks: " + e);
        }
    };

    useEffect(() => {
        getArchivedTasks();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Archive</h2>
                
            </div>
            <div>
                {archivedTasks.map(task => (
                    <TaskCard
                      
                        task={task}
                        isCompleted={true}
                        isArchived={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArchiveList;