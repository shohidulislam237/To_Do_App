// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    addTaskToUI(taskText);
    saveTask(taskText);

    taskInput.value = "";
}

function addTaskToUI(taskText) {
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.innerHTML = `
        ${taskText}
        <div>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    li.onclick = function () {
        li.classList.toggle("completed");
    };

    taskList.appendChild(li);
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.textContent.replace("Delete","").trim();

    li.remove();
    removeTaskFromStorage(taskText);
}

// Save task in localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on page load
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToUI(task);
    });
}

// Remove task from localStorage
function removeTaskFromStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
