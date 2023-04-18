const input = document.querySelector('.input-field');
const addBtn = document.querySelector('.add-btn');
const removeBtn = document.querySelector('.remove-btn');
const list = document.querySelector('.items');
const itemsLimit = 32;

let arrayOfItems = JSON.parse(localStorage.getItem('items')) || [];

const showItems = (items) => {
  for (let i = 0; i < items.length; i++) {
    let listItem = document.createElement('li');
    listItem.innerHTML = items[i];
    listItem.classList.add('item');
    list.appendChild(listItem);
  }
};

const onAddClick = () => {
  if (validateInput(input.value) && checkQueueMaxLength(arrayOfItems)) {
    arrayOfItems.push(input.value);
  }
  list.innerHTML = '';
  input.value = '';
  showItems(arrayOfItems);
  saveToLocalStorage(arrayOfItems);
};

const onRemoveClick = () => {
  if (checkQueueMinLength(arrayOfItems)) {
    arrayOfItems.shift(arrayOfItems[0]);
    list.innerHTML = '';
    showItems(arrayOfItems);
    saveToLocalStorage(arrayOfItems);
  }
};

const validateInput = (value) => {
  if (value == null || value == '') {
    alert('Please fill in an input field');
    return false;
  }
  return true;
};

const checkQueueMinLength = (items) => {
  if (items.length === 1) {
    alert("Plese don't remove the last item");
    return false;
  }
  return true;
};

const checkQueueMaxLength = (items) => {
  if (items.length >= itemsLimit) {
    alert('The queue has its limit');
    return false;
  }
  return true;
};

const saveToLocalStorage = (items) => {
  localStorage.setItem('items', JSON.stringify(items));
};

showItems(arrayOfItems);

addBtn.addEventListener('click', onAddClick);
removeBtn.addEventListener('click', onRemoveClick);
