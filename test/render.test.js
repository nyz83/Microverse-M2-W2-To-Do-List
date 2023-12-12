/** @format */

import { renderTodo } from '../src/todos.js';

const todo1 = {
  id: 1,
  desc: 'mock todo',
  completed: false,
};

const mockContainer = document.createElement('ul');
mockContainer.id = 'todo-list';

beforeEach(() => {
  mockContainer.innerHTML = '';
});

describe('renderTodo function', () => {
  it('adds an exactly one <li> item with correct value to the DOM', () => {
    renderTodo(todo1, mockContainer);
    expect(mockContainer.querySelector('#todoItem')).toBeTruthy();
    expect(mockContainer.querySelector('#todoItem').dataset.id).toBe('1');
    expect(mockContainer.querySelector('#todoText').value).toBe('mock todo');
    expect(mockContainer.querySelector('#todoText').disabled).toBeFalsy();
    expect(mockContainer.querySelector('#todoCheckbox').checked).toBeFalsy();
    expect(mockContainer.querySelectorAll('li')).toHaveLength(1);
  });
});
