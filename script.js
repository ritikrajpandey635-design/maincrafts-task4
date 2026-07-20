const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });
const editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.style.marginLeft = "10px";

editBtn.onclick = function (e) {
    e.stopPropagation();

    const newTask = prompt("Edit Task", tasks[index].text);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask;
        saveTasks();
        displayTasks();
    }
};

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.onclick = function (e) {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        li.appendChild(editBtn);
li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    totalTasks.textContent = tasks.length;

const completed = tasks.filter(task => task.completed).length;

completedTasks.textContent = completed;
pendingTasks.textContent = tasks.length - completed;
}

addBtn.addEventListener("click", () => {

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskInput.value,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
});

displayTasks();
const search = document.getElementById("search");

search.addEventListener("keyup", function () {

    const value = search.value.toLowerCase();

    const li = document.querySelectorAll("#taskList li");

    li.forEach(function(task){

        const text = task.firstChild.textContent.toLowerCase();

        if(text.includes(value)){
            task.style.display = "flex";
        }else{
            task.style.display = "none";
        }

    });

});