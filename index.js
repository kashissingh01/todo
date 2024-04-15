const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        inputBox.value = '';
        saveData();
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// Feature 1: Edit Tasks
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        let text = e.target.textContent.trim();
        let newText = prompt("Edit task:", text);
        if (newText !== null) {
            e.target.textContent = newText;
            saveData();
        }
    }
});

// Feature 2: Clear All Tasks
function clearAllTasks() {
    listContainer.innerHTML = '';
    saveData();
}

// Feature 3: Filter Tasks
function filterTasks(status) {
    let lis = listContainer.getElementsByTagName("li");
    for (let li of lis) {
        if (status === "all") {
            li.style.display = "block";
        } else if (status === "completed" && li.classList.contains("checked")) {
            li.style.display = "block";
        } else if (status === "pending" && !li.classList.contains("checked")) {
            li.style.display = "block";
        } else {
            li.style.display = "none";
        }
    }
}

