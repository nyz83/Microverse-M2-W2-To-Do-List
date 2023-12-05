function sortArr(arr, propName) {
  const newArr = [...arr];
  newArr.sort((a, b) => a[propName] - b[propName]);
  return newArr;
}

function incrementProp(arr, propName) {
  return arr.map((a, i) => ({
    ...a,
    [propName]: String(i + 1),
  }));
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToStorage(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

export {
  sortArr,
  incrementProp,
  loadFromStorage,
  saveToStorage,
};