/* ============================================================
   TO-DO LIST APP — script.js
   ============================================================
   This file handles all interactivity:
     • Loading / saving tasks with localStorage
     • Rendering the task list in the DOM
     • Adding, completing, and deleting tasks
     • Updating the stats bar and empty-state message
   ============================================================ */


/* ──────────────────────────────────────────────────────────
   1. DOM REFERENCES
   Grab every element we'll need to read from or write to.
   ────────────────────────────────────────────────────────── */
const taskInput    = document.getElementById('taskInput');    // text field
const addBtn       = document.getElementById('addBtn');       // "Add Task" button
const taskList     = document.getElementById('taskList');     // <ul> container
const emptyState   = document.getElementById('emptyState');   // "Your list is clear" message
const statsText    = document.getElementById('statsText');    // "X of Y done" counter
const clearDoneBtn = document.getElementById('clearDoneBtn'); // "Clear completed" button


/* ──────────────────────────────────────────────────────────
   2. STATE
   tasks = array of objects: { id, text, completed }
   We load from localStorage on startup and save on every change.
   ────────────────────────────────────────────────────────── */
let tasks = loadTasksFromStorage();


/* ──────────────────────────────────────────────────────────
   3. INITIALISE
   Render whatever was saved last time, then focus the input.
   ────────────────────────────────────────────────────────── */
renderAll();
taskInput.focus();


/* ──────────────────────────────────────────────────────────
   4. EVENT LISTENERS
   ────────────────────────────────────────────────────────── */

// Click the "Add Task" button
addBtn.addEventListener('click', handleAddTask);

// Press Enter inside the text field
taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') handleAddTask();
});

// "Clear completed" button removes all done tasks at once
clearDoneBtn.addEventListener('click', function () {
  tasks = tasks.filter(t => !t.completed);
  saveTasksToStorage();
  renderAll();
});


/* ──────────────────────────────────────────────────────────
   5. HANDLE ADD TASK
   Reads the input, validates it, creates a task object,
   pushes it to the array, saves, and re-renders.
   ────────────────────────────────────────────────────────── */
function handleAddTask() {
  const text = taskInput.value.trim(); // remove leading/trailing spaces

  // Don't add empty tasks
  if (!text) {
    shakeInput();
    return;
  }

  // Build a new task object
  const newTask = {
    id: Date.now(),       // unique numeric ID based on timestamp
    text: text,
    completed: false
  };

  tasks.push(newTask);          // add to state array
  saveTasksToStorage();         // persist immediately
  renderAll();                  // refresh the UI

  taskInput.value = '';         // clear the text field
  taskInput.focus();            // keep focus so user can type another task
}


/* ──────────────────────────────────────────────────────────
   6. TOGGLE COMPLETED
   Flips the completed flag for the task that matches taskId.
   ────────────────────────────────────────────────────────── */
function toggleTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  task.completed = !task.completed;   // flip true ↔ false
  saveTasksToStorage();
  renderAll();
}


/* ──────────────────────────────────────────────────────────
   7. DELETE TASK
   Animates the list item out, then removes it from the array.
   ────────────────────────────────────────────────────────── */
function deleteTask(taskId, listItemEl) {
  // Trigger the CSS slide-out animation
  listItemEl.classList.add('removing');

  // Wait for the animation to finish before actually removing
  listItemEl.addEventListener('animationend', function () {
    tasks = tasks.filter(t => t.id !== taskId); // remove from array
    saveTasksToStorage();
    renderAll();
  }, { once: true }); // { once: true } auto-removes this listener after firing
}


/* ──────────────────────────────────────────────────────────
   8. RENDER ALL
   Clears the <ul> and rebuilds it from the current tasks array.
   Also updates the stats bar and empty-state visibility.
   ────────────────────────────────────────────────────────── */
function renderAll() {
  taskList.innerHTML = ''; // wipe existing list items

  if (tasks.length === 0) {
    // Show the friendly "list is clear" message
    emptyState.style.display = 'block';
    statsText.textContent    = 'No tasks yet';
    clearDoneBtn.style.display = 'none';
    return;
  }

  emptyState.style.display = 'none'; // hide empty-state when there are tasks

  // Build and append a <li> for each task
  tasks.forEach(task => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });

  // Update the stats counter
  updateStats();
}


/* ──────────────────────────────────────────────────────────
   9. CREATE TASK ELEMENT
   Builds a single <li> with checkbox, label, and delete button.
   Returns the element without adding it to the DOM.
   ────────────────────────────────────────────────────────── */
function createTaskElement(task) {
  /* <li class="task-item [completed]"> */
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (task.completed) li.classList.add('completed');
  li.dataset.id = task.id; // store the ID on the element for easy lookup

  /* Checkbox */
  const checkbox = document.createElement('input');
  checkbox.type    = 'checkbox';
  checkbox.classList.add('task-checkbox');
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', 'Mark task as complete');

  // Toggle when the checkbox is clicked
  checkbox.addEventListener('change', function () {
    toggleTask(task.id);
  });

  /* Label (task text) */
  const label = document.createElement('span');
  label.classList.add('task-label');
  label.textContent = task.text;

  // Also toggle when the text label is clicked
  label.addEventListener('click', function () {
    toggleTask(task.id);
  });

  /* Delete button */
  const delBtn = document.createElement('button');
  delBtn.classList.add('delete-btn');
  delBtn.innerHTML = '&times;';           // × character
  delBtn.setAttribute('aria-label', 'Delete task');

  // Call deleteTask with the <li> element so we can animate it
  delBtn.addEventListener('click', function () {
    deleteTask(task.id, li);
  });

  /* Assemble the list item */
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(delBtn);

  return li;
}


/* ──────────────────────────────────────────────────────────
   10. UPDATE STATS BAR
   Shows "X of Y completed" and reveals the clear button
   when at least one task is done.
   ────────────────────────────────────────────────────────── */
function updateStats() {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  statsText.textContent = `${completed} of ${total} task${total !== 1 ? 's' : ''} completed`;

  // Only show the "Clear completed" button when there's something to clear
  clearDoneBtn.style.display = completed > 0 ? 'inline-block' : 'none';
}


/* ──────────────────────────────────────────────────────────
   11. LOCAL STORAGE HELPERS
   All data is stored as a JSON string under the key 'tasks'.
   ────────────────────────────────────────────────────────── */

/** Read tasks from localStorage. Returns an empty array if nothing is saved. */
function loadTasksFromStorage() {
  const stored = localStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
}

/** Serialise and write the current tasks array to localStorage. */
function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


/* ──────────────────────────────────────────────────────────
   12. SHAKE ANIMATION (input validation feedback)
   Briefly shakes the input wrapper when the user tries to
   add an empty task — a subtle way to signal "please type something".
   ────────────────────────────────────────────────────────── */
function shakeInput() {
  const wrapper = taskInput.parentElement; // the .input-wrapper div
  wrapper.classList.add('shake');

  // Remove the class after the animation so it can be triggered again later
  wrapper.addEventListener('animationend', function () {
    wrapper.classList.remove('shake');
  }, { once: true });
}

/* Inject the shake keyframes dynamically so the CSS file stays clean */
(function injectShakeKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-7px); }
      40%      { transform: translateX(7px); }
      60%      { transform: translateX(-5px); }
      80%      { transform: translateX(5px); }
    }
    .shake { animation: shake 0.38s ease; }
  `;
  document.head.appendChild(style);
})();
