import React, { useState, useEffect } from 'react';
import { Client } from 'elasticsearch';

const client = new Client({
  host: 'localhost:9200', // Replace with your Elasticsearch host
});

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Function to fetch todo list data from Elasticsearch
    const fetchTodos = async () => {
      try {
        const response = await client.search({
          index: 'todos', // Replace with your Elasticsearch index name
          body: {
            query: {
              multi_match: {
                query: searchTerm,
                fields: ['title', 'desc'],
              },
            },
          },
        });

        const hits = response.hits.hits;
        const todos = hits.map((hit) => hit._source);
        setTodos(todos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.desc}</td>
              <td>{todo.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
