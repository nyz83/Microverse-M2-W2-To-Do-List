import {
  sortArr,
  incrementProp,
  saveToStorage,
  loadFromStorage,
} from '../src/utils.js';

describe('Array Manipulation functions', () => {
  test('sortArr func', () => {
    const arr = [
      { name: 'ny', age: 30 },
      { name: 'ye', age: 22 },
      { name: 'zin', age: 44 },
    ];
    expect(sortArr(arr, 'age')).toStrictEqual([
      { name: 'ye', age: 22 },
      { name: 'ny', age: 30 },
      { name: 'zin', age: 44 },
    ]);
  });

  test('incrementProp func', () => {
    const arr = [
      { name: 'ny', id: '0' },
      { name: 'ye', id: '1' },
    ];
    expect(incrementProp(arr, 'id')).toStrictEqual([
      { name: 'ny', id: '1' },
      { name: 'ye', id: '2' },
    ]);
  });
});

describe('LocalStorage Functions', () => {
  afterEach(() => {
    global.window = undefined;
    global.document = undefined;
    global.localStorage = undefined;
  });

  test('loadFromStorage should return empty array for non-existent key', () => {
    const key = 'non-existent-key';
    const result = loadFromStorage(key);
    expect(result).toEqual([]);
  });

  test('loadFromStorage should return saved array for existing key', () => {
    const key = 'existent-key';
    const data = ['foo', 'bar', 'baz'];
    saveToStorage(key, data);
    const result = loadFromStorage(key);
    expect(result).toEqual(data);
  });

  test('saveToStorage should save the data to localStorage', () => {
    const key = 'my-data';
    const data = ['foo', 'bar', 'baz'];
    saveToStorage(key, data);
    const savedData = JSON.parse(localStorage.getItem(key));
    expect(savedData).toEqual(data);
  });
});