/** @format */

import { removeTodo } from '../src/todos.js';

describe('removeTodo function', () => {
  it('removes a todo by given id', () => {
    const todos = [
      { id: 1, desc: 'task 1', completed: true },
      { id: 2, desc: 'task 2', completed: false },
      { id: 3, desc: 'task 3', completed: false },
    ];
    const filteredTodos = removeTodo(todos, 'id', 2);
    expect(filteredTodos).toHaveLength(2);
    expect(filteredTodos).not.toContainEqual({
      id: 2,
      desc: 'task2',
      completed: false,
    });
  });
});
