import React, { useState } from "react";
import "./App.css";
const initialTodos = [
  { id: "id-1", text: "Вивчити основи React", completed: true },
  { id: "id-2", text: "Розібратися з React Router", completed: false },
  { id: "id-3", text: "Пережити Redux", completed: false },
];

function TodoList({ tasks, onToggleTaskCompletion, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTaskCompletion(task.id)}
          />
          {task.text}
          <button onClick={() => onDeleteTask(task.id)}>Видалити</button>
        </li>
      ))}
    </ul>
  );
}

function TodoEditor({ onAddTask }) {
  const [newTaskText, setNewTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === "") return;
    onAddTask(newTaskText);
    setNewTaskText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Нове завдання"
      />
      <button type="submit">Додати</button>
    </form>
  );
}

function Filter({ filter, onFilterChange }) {
  return (
    <input
      type="text"
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
      placeholder="Фільтр завдань"
    />
  );
}

function Info({ totalTasks, completedTasks }) {
  return (
    <div>
      <p>Загальна кількість завдань: {totalTasks}</p>
      <p>Кількість виконаних завдань: {completedTasks}</p>
    </div>
  );
}
function App() {
  const [state, setState] = useState({
    todos: initialTodos,
    filter: "",
  });

  const addTask = (text) => {
    const newTask = {
      id: `id-${state.todos.length + 1}`,
      text: text,
      completed: false,
    };
    setState({
      ...state,
      todos: [...state.todos, newTask],
    });
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTodos = state.todos.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setState({
      ...state,
      todos: updatedTodos,
    });
  };

  const deleteTask = (taskId) => {
    const updatedTodos = state.todos.filter((task) => task.id !== taskId);
    setState({
      ...state,
      todos: updatedTodos,
    });
  };

  const handleFilterChange = (filter) => {
    setState({
      ...state,
      filter: filter,
    });
  };

  const filteredTodos = state.todos.filter((task) =>
    task.text.toLowerCase().includes(state.filter.toLowerCase())
  );

  const totalTasks = state.todos.length;
  const completedTasks = state.todos.filter((task) => task.completed).length;

  return (
    <div>
      <h1>Список завдань</h1>

      <TodoEditor onAddTask={addTask} />
      <Filter filter={state.filter} onFilterChange={handleFilterChange} />
      <TodoList
        tasks={filteredTodos}
        onToggleTaskCompletion={toggleTaskCompletion}
        onDeleteTask={deleteTask}
      />
      <Info totalTasks={totalTasks} completedTasks={completedTasks} />
    </div>
  );
}
function TodoEdit({ task, onSave, onCancel }) {
  const [editingText, setEditingText] = useState(task.text);
  const handleSaveClick = () => {
    onSave(task.id, editingText);
  };
  return (
    <div>
      <input
        type="text"
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
      ></input>
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default App;
