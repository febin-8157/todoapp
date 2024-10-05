import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleComplete, deleteTodo } from './redux/todoSlice';

const App = () => {
  const [todoText, setTodoText] = useState('');
  // todos = store , 2nd => todos of array in slice
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo({ id: Date.now(), text: todoText, completed: false }));
      setTodoText('');
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Todo App</h1>

      <div className="flex w-full max-w-md mb-4 ">
        <input style={{width:'400px'}}
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Add a new todo"
          className="  text-center border border-gray-300 rounded-md focus:outline-none indigo-400"
        />
        <button
          onClick={handleAddTodo}
          className="font-bold ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-indigo-600"
        >
          Add Todo
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {todos.map((todo) => (
          <li
          key={todo.id}
          className={`flex justify-between items-center p-2 border border-gray-200 rounded-md ${
            todo.completed ? 'bg-green-200' : 'bg-white'
          }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleComplete(todo.id)}
            className="mr-3 ml-2 h-5 w-5 accent-green-500"
          />
          <span
            onClick={() => handleToggleComplete(todo.id)}
            className="cursor-pointer flex-1 text-left"
          >
            {todo.text}
          </span>
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </li>
        
        ))}
      </ul>
    </div>
  );
};

export default App;