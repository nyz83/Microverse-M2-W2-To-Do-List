import './style.css';
import {
  sortArr,
  loadFromStorage,
  saveToStorage,
  incrementProp,
} from './utils.js';

const todoList = document.querySelector('#todoList');
const clearCompletedBtn = document.querySelector('#clearCompleted');
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoTemplate = document.querySelector('#todoTemplate');
const STORAGE_KEY = 'todos';

function renderTodo(todo) {
  const { id, desc, completed } = todo;
  const todoTemplateClone = todoTemplate.content.cloneNode(true);
  const todoItem = todoTemplateClone.querySelector('#todoItem');
  const todoCheckbox = todoTemplateClone.querySelector('#todoCheckbox');
  const todoText = todoTemplateClone.querySelector('#todoText');
  todoItem.dataset.id = id;
  todoText.value = desc;
  todoText.disabled = todo.completed;
  todoCheckbox.checked = completed;
  todoList.appendChild(todoTemplateClone);
}

window.addEventListener('load', () => {
  const todos = loadFromStorage(STORAGE_KEY);
  todos.forEach((todo) => renderTodo(todo));
});

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todos = loadFromStorage(STORAGE_KEY);
  const todoDesc = todoInput.value;
  if (!todoDesc) return;
  const newTodo = {
    id: String(todos.length + 1),
    desc: todoDesc,
    completed: false,
  };
  const newTodos = [...todos, newTodo];
  saveToStorage(STORAGE_KEY, newTodos);
  renderTodo(newTodo);
  todoInput.value = '';
});

todoList.addEventListener('click', (e) => {
  const todos = loadFromStorage(STORAGE_KEY);
  if (!e.target.matches('#todoDelete')) return;
  const parent = e.target.closest('#todoItem');
  const { id } = parent.dataset;
  parent.remove();
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  const sortedTodos = sortArr(incrementProp(filteredTodos, 'id'), 'id');
  todoList.innerHTML = '';
  sortedTodos.forEach((todo) => renderTodo(todo));
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
  const completedTodos = todos.filter((todo) => todo.completed !== true);
  const sortedTodos = sortArr(incrementProp(completedTodos, 'id'), 'id');
  todoList.innerHTML = '';
  sortedTodos.forEach((todo) => renderTodo(todo));
  saveToStorage(STORAGE_KEY, sortedTodos);
});