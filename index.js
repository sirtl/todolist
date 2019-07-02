const todoArr = [];
const inProgressArr = [];
const doneArr = [];
const addTaskBtn = document.querySelector('.board__icon--add')
const deleteTasksBtn = document.querySelector('.board__icon--delete')

addTaskBtn.addEventListener('click', () => {
  document.querySelector('.bg-blur').classList.add('is-active')
  document.querySelector('.popup').classList.add('is-active')
  document.querySelector('.popup-wrapper').classList.add('is-active')
})
document.querySelector('.popup__icon--close').addEventListener('click', () => {
  document.querySelector('.bg-blur').classList.remove('is-active')
  document.querySelector('.popup').classList.remove('is-active')
  document.querySelector('.popup-wrapper').classList.remove('is-active')
})
deleteTasksBtn.addEventListener('click', () => {
  doneArr.splice(0)
  renderListDone();
  console.log(doneArr)
})

const todoList = document.querySelector('ul[data-board="todo"]');
const progressList = document.querySelector('ul[data-board="progress"]');
const doneList = document.querySelector('ul[data-board="done"]');

todoList.addEventListener('click', (e) => {
  const index = e.target.parentNode.dataset.key;
  if (e.target.classList.contains('btn--delete')) {
    todoArr.splice(index, 1);
    const li = document.querySelector(`li[data-key="${index}"]`)
    li.remove();

  } else if (e.target.classList.contains('btn--start')) {
    inProgressArr.push(todoArr[index])
    todoArr.splice(index, 1);
    const li = document.querySelector(`li[data-key="${index}"]`)
    li.remove();

  }
  renderListTodo();
  renderListProgress();
  renderListDone();
});

progressList.addEventListener('click', (e) => {
  const index = e.target.parentNode.dataset.key;
  if (e.target.classList.contains('btn--stop')) {
    todoArr.push(inProgressArr[index])
    inProgressArr.splice(index, 1);
    const li = document.querySelector(`li[data-key="${index}"]`)
    li.remove();

  } else if (e.target.classList.contains('btn--done')) {
    doneArr.push(inProgressArr[index])
    inProgressArr.splice(index, 1);
    const li = document.querySelector(`li[data-key="${index}"]`)
    li.remove();

  }
  renderListTodo();
  renderListProgress();
  renderListDone();
})
doneList.addEventListener('click', (e) => {
  const index = e.target.parentNode.dataset.key;
  if (e.target.classList.contains('btn--undo')) {
    inProgressArr.push(doneArr[index])
    doneArr.splice(index, 1);
    const li = document.querySelector(`li[data-key="${index}"]`)
    li.remove();

  }
  renderListTodo();
  renderListProgress();
  renderListDone();
})

const renderListDone = () => {
  doneList.textContent = '';
  doneArr.forEach((task, index) => {
    const listItem = document.createElement('li')
    listItem.classList.add('list__item')
    listItem.setAttribute('data-key', index)

    const taskTitle = document.createElement('h3')
    taskTitle.classList.add('list__item__title')

    const taskDescription = document.createElement('p')
    taskDescription.classList.add('list__item__description')

    const undoBtn = document.createElement('button')
    undoBtn.setAttribute('data-key', index)
    const doneBtn = document.createElement('button')
    doneBtn.setAttribute('data-key', index)
    const iconStop = document.createElement('i')

    taskTitle.textContent = task.title
    taskDescription.textContent = task.description


    //append elements

    doneList.appendChild(listItem)
    listItem.appendChild(taskTitle)
    listItem.appendChild(taskDescription)
    listItem.appendChild(undoBtn).classList.add('btn', 'btn--undo')
    undoBtn.appendChild(iconStop).classList.add('fas', 'fa-undo', 'btn__icon')

  })
  document.querySelector('span[data-board="done"]').textContent = doneArr.length;
}

const renderListProgress = () => {
  progressList.textContent = '';
  inProgressArr.forEach((task, index) => {
    const listItem = document.createElement('li')
    listItem.classList.add('list__item')
    listItem.setAttribute('data-key', index)

    const taskTitle = document.createElement('h3')
    taskTitle.classList.add('list__item__title')

    const taskDescription = document.createElement('p')
    taskDescription.classList.add('list__item__description')

    const stopBtn = document.createElement('button')
    stopBtn.setAttribute('data-key', index)
    const doneBtn = document.createElement('button')
    doneBtn.setAttribute('data-key', index)
    const iconStop = document.createElement('i')

    taskTitle.textContent = task.title
    taskDescription.textContent = task.description


    //append elements

    progressList.appendChild(listItem)
    listItem.appendChild(taskTitle)
    listItem.appendChild(taskDescription)
    listItem.appendChild(stopBtn).classList.add('btn', 'btn--stop')
    stopBtn.appendChild(iconStop).classList.add('fas', 'fa-pause', 'btn__icon')
    listItem.appendChild(doneBtn).classList.add('btn', 'btn--done')
    doneBtn.textContent = 'Done'

  })
  document.querySelector('span[data-board="progress"]').textContent = inProgressArr.length;
}

const renderListTodo = () => {
  todoList.textContent = ''
  todoArr.forEach((task, index) => {
    const listItem = document.createElement('li')
    listItem.classList.add('list__item')
    listItem.setAttribute('data-key', index)

    const taskTitle = document.createElement('h3')
    taskTitle.classList.add('list__item__title')

    const taskDescription = document.createElement('p')
    taskDescription.classList.add('list__item__description')

    const addBtn = document.createElement('button')
    addBtn.setAttribute('data-key', index)
    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('data-key', index)
    const iconStart = document.createElement('i')
    const iconDelete = document.createElement('i')

    taskTitle.textContent = task.title
    taskDescription.textContent = task.description


    //append elements

    todoList.appendChild(listItem)
    listItem.appendChild(taskTitle)
    listItem.appendChild(taskDescription)
    listItem.appendChild(addBtn).classList.add('btn', 'btn--start')
    addBtn.appendChild(iconStart).classList.add('fas', 'fa-play', 'btn__icon')
    listItem.appendChild(deleteBtn).classList.add('btn', 'btn--delete')
    deleteBtn.appendChild(iconDelete).classList.add('fas', 'fa-trash-alt', 'btn__icon')

    charCounter.textContent = '0/160';

  })
  document.querySelector('span[data-board="todo"]').textContent = todoArr.length;
}
const titleInput = document.querySelector('.popup__input');
const descriptionInput = document.querySelector('.popup__textarea');

const addTask = () => {
  const task = {
    title: titleInput.value,
    description: descriptionInput.value,
  }

  if (!titleInput.value && !descriptionInput.value) {
    alert('Add title and description');
  } else {
    todoArr.push(task);
    renderListTodo();

    //popup successfull info
    document.querySelector('.popup__info').classList.add('show')
    setTimeout(() => {
      document.querySelector('.popup__info').classList.remove('show')
    }, 3000)
  }
  titleInput.value = '';
  descriptionInput.value = '';


}
const charCounter = document.querySelector('.popup__textarea--counter span')
descriptionInput.addEventListener('input', () => {
  charCounter.textContent = `${descriptionInput.value.length}/160`
})

document.querySelector('.popup__btn--add').addEventListener('click', addTask);