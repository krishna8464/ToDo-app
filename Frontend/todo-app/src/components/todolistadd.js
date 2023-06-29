import React, { useState } from 'react';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const todoData = {
      title: title,
      desc: desc,
      priority: priority
    };

    const token = sessionStorage.getItem('token'); 
    // Send POST request with todoData
    fetch('https://todo-backend-tzf7.onrender.com/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `${token}`
      },
      body: JSON.stringify(todoData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle response data if needed
        window.location.reload(false);
        alert("todo list item added")
      })
      .catch(error => {
        console.error(error);
      });

    // Reset form fields
    setTitle('');
    setDesc('');
    setPriority('');
  };

  return (
    <div>
        <hr></hr>
      <h2>Create a New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={desc} onChange={e => setDesc(e.target.value)} required />
        </div>
        <div>
          <label>Priority:</label>
          <input type="text" value={priority} onChange={e => setPriority(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      <hr></hr>
    </div>
  );
};

export default TodoForm;
