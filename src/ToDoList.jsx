import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState([]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, completed: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function handleCompletedTask(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    return (
        <div className='to-do-list'>
            <h1>To-Do-List</h1>
            <form>
                <input
                    type='text'
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className='add-button' onClick={addTask}>
                    Add
                </button>
            </form>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index} style={{ backgroundColor: task.completed ? 'darkgrey' : 'white' }}>
                        <span className='text'>{task.text}</span>
                        <button className='delete-button' onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button className='move-button' onClick={() => moveUp(index)}>
                            👆
                        </button>
                        <button className='move-button' onClick={() => moveDown(index)}>
                            👇
                        </button>
                        <button className='complete-button' onClick={() => handleCompletedTask(index)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
