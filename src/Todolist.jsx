import React, { useState } from "react";
import "./App.css"; // Import the CSS file

function Todolist() {
    const [tasks, setTasks] = useState(["Eat", "Sleep", "Code"]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleEditInputChange(event) {
        setEditTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim()) {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const newTasks = tasks.filter((task, i) => i !== index);
        setTasks(newTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const newTasks = [...tasks];
            [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
            setTasks(newTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const newTasks = [...tasks];
            [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
            setTasks(newTasks);
        }
    }

    function startEditing(index) {
        setEditIndex(index);
        setEditTask(tasks[index]);
    }

    function saveEdit(index) {
        const newTasks = [...tasks];
        newTasks[index] = editTask;
        setTasks(newTasks);
        setEditIndex(null);
        setEditTask("");
    }

    function cancelEdit() {
        setEditIndex(null);
        setEditTask("");
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter a task"
                    onChange={handleInputChange}
                    value={newTask}
                />
                <button className="Add-btn" onClick={addTask}>Add</button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        {editIndex === index ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTask}
                                    onChange={handleEditInputChange}
                                />
                                <button onClick={() => saveEdit(index)}>Save</button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <span>{task}</span>
                                <button onClick={() => deleteTask(index)}>Del</button>
                                <button onClick={() => moveTaskUp(index)}>👆</button>
                                <button onClick={() => moveTaskDown(index)}>👇</button>
                                <button onClick={() => startEditing(index)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Todolist;
