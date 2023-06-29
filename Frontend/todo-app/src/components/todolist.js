import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todo list data from the API
  useEffect(() => {
    const token = sessionStorage.getItem('token'); 

    fetch('https://todo-backend-tzf7.onrender.com/getlist', {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        sessionStorage.setItem("todolist",JSON.stringify(data))
        setTodos(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    // Logic to delete the todo item with the specified id
    const token = sessionStorage.getItem('token'); 
    fetch(`https://todo-backend-tzf7.onrender.com/delete/${id}`,{
        method : "DELETE",
        headers :{
            Authorization: `${token}`
        }
    })
    window.location.reload(false);
    alert("Todo item deleted successfully")

  };

  const handleEdit = (id) => {
    // Logic to edit the todo item with the specified id
    let desc = prompt("description","desc");
    const token = sessionStorage.getItem('token'); 
    // console.log(desc)
    fetch(`https://todo-backend-tzf7.onrender.com/update/${id}`,{
        method : "PATCH",
        headers :{
            "Content-Type" : "application/json",
            "Authorization": `${token}`
        },
        body : JSON.stringify({desc : desc})
    })
    window.location.reload(false);
    alert("Todo List updated")
  };

  const handleLogout = () => {
    // Logic fasfto logout and navigate to the home page
    window.location.reload(false);
    sessionStorage.clear()
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.desc}</td>
              <td>{todo.priority}</td>
              <td>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
                <button onClick={() => handleEdit(todo._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
