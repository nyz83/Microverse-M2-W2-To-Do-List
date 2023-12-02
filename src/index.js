import './style.css';

const todoList = document.querySelector('#todoList');
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoTemplate = document.querySelector('#todoTemplate');
const STORAGE_KEY = 'todos';

function loadTodos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

let todos = loadTodos();

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodo(todo) {
  const { id, desc, completed } = todo;
  const todoTemplateClone = todoTemplate.content.cloneNode(true);
  const todoItem = todoTemplateClone.querySelector('#todoItem');
  const todoCheckbox = todoTemplateClone.querySelector('[data-list-item-checkbox]');
  const todoText = todoTemplateClone.querySelector('[data-list-item-text]');
  todoItem.dataset.id = id;
  todoText.value = desc;
  todoText.disabled = todo.completed;
  todoCheckbox.checked = completed;
  todoList.appendChild(todoTemplateClone);
}

todos.forEach((todo) => renderTodo(todo));

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoDesc = todoInput.value;
  if (!todoDesc) return;
  const newTodo = {
    id: String(todos.length + 1),
    desc: todoDesc,
    completed: false,
  };
  todos.push(newTodo);
  renderTodo(newTodo);
  saveTodos();
  todoInput.value = '';
});

todoList.addEventListener('click', (e) => {
  if (!e.target.matches('[data-button-delete]')) return;
  const parent = e.target.closest('#todoItem');
  const { id } = parent.dataset;
  parent.remove();
  todos = todos.filter((todo) => todo.id !== id);
  todos.forEach((todo, index) => {
    todo.id = (index + 1).toString();
  });
  const sortedTodos = todos.sort((a, b) => a.id - b.id);
  todoList.innerHTML = '';
  sortedTodos.forEach((todo) => renderTodo(todo));
  saveTodos();
});

todoList.addEventListener('input', (e) => {
  if (!e.target.matches('[data-list-item-text]')) return;
  const parent = e.target.closest('#todoItem');
  const { id } = parent.dataset;
  const todo = todos.find((todo) => todo.id === id);
  todo.desc = e.target.value;
  saveTodos();
});