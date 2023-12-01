import './style.css';

const todos = [
  {
    id: 1,
    desc: 'complete the project',
    completed: false,
  },
  {
    id: 2,
    desc: 'complete the project',
    completed: false,
  },
  {
    id: 0,
    desc: 'wash the dishes',
    completed: false,
  },
];

const todoList = document.querySelector('#todoList');
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoTemplate = document.querySelector('#todoTemplate');

function renderTodo(todo) {
  const { id, desc, completed } = todo;
  const todoTemplateClone = todoTemplate.content.cloneNode(true);
  const todoItem = todoTemplateClone.querySelector('#todoItem');
  const todoText = todoTemplateClone.querySelector('[data-list-item-text]');
  const todoCheckbox = todoTemplateClone.querySelector('[data-list-item-checkbox]');
  todoItem.dataset.id = id;
  todoText.innerText = desc;
  todoCheckbox.checked = completed;
  todoList.appendChild(todoTemplateClone);
}

const sortedTodos = todos.sort((a, b) => a.id - b.id);

sortedTodos.forEach((todo) => renderTodo(todo));

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoDesc = todoInput.value;
  if (!todoDesc) return;
  const newTodo = {
    id: todos.length,
    desc: todoDesc,
    complete: false,
  };
  renderTodo(newTodo);
  todoInput.value = '';
});