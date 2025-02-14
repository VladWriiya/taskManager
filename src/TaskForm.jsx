import React, { useEffect, useState } from "react";
import { collection, firestore, getDocs, addDoc } from "firebase/firestore";
import {firebase} from "./firebase";


const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [assignee, setAssignee] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("Not Completed");
    const [priority, setPriority] = useState("2"); 
    const [tasks, setTasks] = useState([]);
    const db = collection(firebase, "task_form");

    useEffect(() => {
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
        }
        getTasks();
    }, []);

    const addTask = async () => {
        if (!title || title.length === 0) {
            alert("Please enter a title for the task");
            return;
        }

        try {
            const data = await addDoc(db, {
                title: title,
                assignee: assignee,
                description: description,
                deadline: deadline,
                status: status,
                priority: parseInt(priority)
            });
            setTasks([...tasks, {
                id: data.id,
                title,
                assignee,
                description,
                deadline,
                status,
                priority: parseInt(priority)
            }]);
            
            setTitle("");
            setAssignee("");
            setDescription("");
            setDeadline("");
            setStatus("Not Completed");
            setPriority("2");
            alert("Task successfully added!");
        } catch (e) {
            alert("Error adding task: " + e);
        }
    }

    return(
        <div className="container mt-4">
            
            {console.table(tasks)}
            <div className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter task title" 
                        value={title} 
                        onChange={(e)=> setTitle(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Assignee:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter assignee name" 
                        value={assignee} 
                        onChange={(e)=> setAssignee(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea 
                        className="form-control" 
                        placeholder="Enter task description" 
                        value={description} 
                        onChange={(e)=> setDescription(e.target.value)}
                        rows="3"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Priority:</label>
                    <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="1">High Priority</option>
                        <option value="2">Medium Priority</option>
                        <option value="3">Low Priority</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Deadline:</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={deadline} 
                        onChange={(e)=> setDeadline(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status:</label>
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Not Completed">Not Completed</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button className="btn btn-secondary w-100" onClick={addTask}>Add task</button>
            </div>
        </div>
    )
};

export default TaskForm;
