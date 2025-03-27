let tasks = [];

document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("showAll").addEventListener("click", () => filterTasks("all"));
document.getElementById("showDone").addEventListener("click", () => filterTasks("done"));
document.getElementById("showInProgress").addEventListener("click", () => filterTasks("in-progress"));
document.getElementById("showNotDone").addEventListener("click", () => filterTasks("not-done"));

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim()) {
        const task = {
            id: Date.now(),
            content: taskInput,
            status: "not-done"
        };
        tasks.push(task);
        document.getElementById("taskInput").value = '';
        renderTasks(tasks);
    }
}

function renderTasks(filteredTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (task.status === "done") {
            li.classList.add("done");
        } else if (task.status === "in-progress") {
            li.classList.add("in-progress");
        }

        li.innerHTML = `
            <span>${task.content}</span>
            <div>
                <button class="update" onclick="updateTaskStatus(${task.id})">In Progress</button>
                <button class="update" onclick="markAsDone(${task.id})">Done</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function updateTaskStatus(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.status = "in-progress";
        renderTasks(tasks);
    }
}

function markAsDone(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.status = "done";
        renderTasks(tasks);
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(tasks);
}

function filterTasks(status) {
    if (status === "all") {
        renderTasks(tasks);
    } else {
        const filteredTasks = tasks.filter(task => task.status === status);
        renderTasks(filteredTasks);
    }
}

renderTasks(tasks);
