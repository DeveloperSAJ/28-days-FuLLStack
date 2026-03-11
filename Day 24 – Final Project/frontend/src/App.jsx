import React, { useState, useEffect } from "react";
import "./index.css";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {

    if (!task) return;

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: task })
    });

    setTask("");
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (index) => {

    await fetch(`http://localhost:5000/tasks/${index}`, {
      method: "DELETE"
    });

    fetchTasks();
  };

  return (
    <div className="container">

      <h1>Task Manager</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>
          Add
        </button>
      </div>

      <div className="task-list">

        {tasks.map((t, index) => (
          <div className="task-item" key={index}>

            <span>{t.title}</span>

            <button
              className="delete-btn"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;