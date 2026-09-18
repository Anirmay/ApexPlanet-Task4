document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'apexplanet-tasks';
  const form = document.getElementById('todoForm');
  const input = document.getElementById('todoInput');
  const list = document.getElementById('todoList');
  const message = document.getElementById('todoMessage');
  const counter = document.getElementById('todoCounter');
  const clearCompletedButton = document.getElementById('clearCompleted');
  const clearAllButton = document.getElementById('clearAll');

  if (!form || !input || !list || !message || !counter) return;

  let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function updateCounter() {
    const activeCount = tasks.filter((task) => !task.completed).length;
    counter.textContent = `${activeCount} active task${activeCount !== 1 ? 's' : ''} / ${tasks.length} total`;
  }

  function renderTasks() {
    list.innerHTML = '';

    if (tasks.length === 0) {
      const emptyState = document.createElement('li');
      emptyState.className = 'empty-state';
      emptyState.textContent = 'No tasks yet. Add your first item to get started.';
      list.appendChild(emptyState);
      updateCounter();
      return;
    }

    tasks.forEach((task, index) => {
      const item = document.createElement('li');
      item.className = `todo-item ${task.completed ? 'completed' : ''}`;

      const main = document.createElement('div');
      main.className = 'todo-main';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.setAttribute('aria-label', `Mark ${task.text} complete`);
      checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const text = document.createElement('span');
      text.className = 'todo-text';
      text.textContent = task.text;

      const actions = document.createElement('div');
      actions.className = 'todo-actions';

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'icon-btn';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      main.appendChild(checkbox);
      main.appendChild(text);
      actions.appendChild(deleteButton);
      item.appendChild(main);
      item.appendChild(actions);
      list.appendChild(item);
    });

    updateCounter();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (!value) {
      message.textContent = 'Please enter a task.';
      message.className = 'form-message error';
      return;
    }

    tasks.unshift({
      id: Date.now(),
      text: value,
      completed: false,
    });

    saveTasks();
    renderTasks();
    form.reset();
    message.textContent = 'Task added successfully.';
    message.className = 'form-message success';
  });

  if (clearCompletedButton) {
    clearCompletedButton.addEventListener('click', () => {
      tasks = tasks.filter((task) => !task.completed);
      saveTasks();
      renderTasks();
      message.textContent = 'Completed tasks cleared.';
      message.className = 'form-message success';
    });
  }

  if (clearAllButton) {
    clearAllButton.addEventListener('click', () => {
      tasks = [];
      saveTasks();
      renderTasks();
      message.textContent = 'All tasks were removed.';
      message.className = 'form-message success';
    });
  }

  renderTasks();
});
