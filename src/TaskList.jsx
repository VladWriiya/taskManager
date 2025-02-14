import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firebase } from './firebase';

import ActiveTasks from './components/ActiveTasks';
import CompletedTasks from './components/CompletedTasks';
import SearchBar from './components/SearchBar';
import SortSelector from './components/SortSelector';
import NasaImageOfDay from './components/NasaImageOfDay';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('priority');
    const db = collection(firebase, "task_form");

    const getTasks = async () => {
        try {
            const data = await getDocs(db);
            const tasksData = data.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(tasksData);
        } catch (e) {
            alert("Error getting documents: " + e);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const completeTask = async (taskId) => {
        try {
            const data = doc(firebase, "task_form", taskId);
            await updateDoc(data, {
                status: "Completed"
            });
            getTasks();
        } catch (e) {
            alert("Error updating task: " + e);
        }
    };

    const archiveTask = async (taskId) => {
        try {
            const data = doc(firebase, "task_form", taskId);
            await updateDoc(data, {
                status: "Archived"
            });
            getTasks();
        } catch (e) {
            alert("Error archiving task: " + e);
        }
    };

    const filterTasks = (tasks) => {
        return tasks.filter(task => 
            task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const sortTasks = (tasks) => {
        const sortedTasks = [...tasks];
        if (sortBy === 'priority') {
            sortedTasks.sort((a, b) => (a.priority || 2) - (b.priority || 2));
        } else if (sortBy === 'deadline') {
            sortedTasks.sort((a, b) => {
                if (!a.deadline) return 1;
                if (!b.deadline) return -1;
                return new Date(a.deadline) - new Date(b.deadline);
            });
        }
        return sortedTasks;
    };

    const incompleteTasks = sortTasks(
        filterTasks(
            tasks.filter(task => task.status !== "Completed" && task.status !== "Archived")
        )
    );
    const completedTasks = filterTasks(tasks.filter(task => task.status === "Completed"));

    return (
        <div className="container mt-4">
            <NasaImageOfDay />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>All Tasks</h2>
            </div>
            <div className="row mb-4">
                <div className="col-md-8">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
                <div className="col-md-4">
                    <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
                </div>
            </div>
            <div>
                <ActiveTasks tasks={incompleteTasks} onComplete={completeTask} />
                <CompletedTasks tasks={completedTasks} onArchive={archiveTask} />
            </div>
        </div>
    );
};

export default TaskList; 