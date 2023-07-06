import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/get');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/save', newTask);
      fetchTasks();
      setNewTask({ title: '', description: '', completed: false });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <nav>
        <ul className="navbar">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/add">Add Task</a>
          </li>
        </ul>
      </nav>

      {window.location.pathname === '/' && (
        <div>
          <h1>Task List</h1>
          {tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {window.location.pathname === '/add' && (
        <div>
          <h1>Add Task</h1>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
            <input
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
            />
            <input
              type="checkbox"
              name="completed"
              checked={newTask.completed}
              onChange={() =>
                setNewTask((prevTask) => ({
                  ...prevTask,
                  completed: !prevTask.completed,
                }))
              }
            />
            <label htmlFor="completed">Completed</label>
            <button type="submit">Add Task</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
