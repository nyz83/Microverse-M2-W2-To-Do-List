import './style.css';
import {
  renderTodo,
  removeTodo,
  createTodo,
} from './todos.js';
import {
  sortArr,
  loadFromStorage,
  saveToStorage,
  incrementProp,
} from './utils.js';

const todoList = document.querySelector('#todoList');
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const clearCompletedBtn = document.querySelector('#clearCompleted');
const STORAGE_KEY = 'todos';

window.addEventListener('load', () => {
  const todos = loadFromStorage(STORAGE_KEY);
  todos.forEach((todo) => renderTodo(todo, todoList));
});

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todos = loadFromStorage(STORAGE_KEY);
  const newTodo = createTodo(todos.length + 1, todoInput.value, false);
  saveToStorage(STORAGE_KEY, [...todos, newTodo]);
  renderTodo(newTodo, todoList);
  todoInput.value = '';
});

todoList.addEventListener('click', (e) => {
  const todos = loadFromStorage(STORAGE_KEY);
  if (!e.target.matches('#todoDelete')) return;
  const parent = e.target.closest('#todoItem');
  const { id } = parent.dataset;
  parent.remove();
  const deletedTodos = removeTodo(todos, 'id', id);
  const sortedTodos = sortArr(incrementProp(deletedTodos, 'id'), 'id');
  todoList.innerHTML = '';
  sortedTodos.forEach((todo) => renderTodo(todo, todoList));
  saveToStorage(STORAGE_KEY, sortedTodos);
});

todoList.addEventListener('input', (e) => {
  const todos = loadFromStorage(STORAGE_KEY);
  if (!e.target.matches('#todoText')) return;
  const parent = e.target.closest('#todoItem');
  const { id } = parent.dataset;
  const newTodos = [...todos];
  const todo = newTodos.find((todo) => todo.id === id);
  todo.desc = e.target.value;
  saveToStorage(STORAGE_KEY, newTodos);
});

todoList.addEventListener('change', (e) => {
  const todos = loadFromStorage(STORAGE_KEY);
  if (!e.target.matches('#todoCheckbox')) return;
  const parent = e.target.closest('#todoItem');
  const todoText = parent.querySelector('#todoText');
  const { id } = parent.dataset;
  const newTodos = [...todos];
  const todo = newTodos.find((todo) => todo.id === id);
  todo.completed = e.target.checked;
  todoText.disabled = todo.completed;
  saveToStorage(STORAGE_KEY, newTodos);
});

clearCompletedBtn.addEventListener('click', () => {
  const todos = loadFromStorage(STORAGE_KEY);
  const inCompletedTodos = removeTodo(todos, 'completed', true);
  const sortedTodos = sortArr(incrementProp(inCompletedTodos, 'id'), 'id');
  todoList.innerHTML = '';
  sortedTodos.forEach((todo) => renderTodo(todo, todoList));
  saveToStorage(STORAGE_KEY, sortedTodos);
});