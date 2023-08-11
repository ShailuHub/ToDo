const form = document.getElementById("taskForm");
const name = document.getElementById("name");
const description = document.getElementById("description");
const tableBody1 = document.getElementById("tableBody1");
const tableBody2 = document.getElementById("tableBody2");
form.dataset.mode = "";

//All eventListener
form.addEventListener("submit", postTask);
tableBody1.addEventListener("click", handleButton);
tableBody2.addEventListener("click", handleButton);

//Get request for done task
async function getDoneTask() {
  try {
    const response = await axios.get(
      "http://localhost:3000/add-task/?status=true"
    );
    const data = response.data;
    tableBody2.innerHTML = "";
    data.forEach((item) => {
      showDoneTask(item);
    });
  } catch (error) {
    console.log(error);
  }
}

//Get request for not done task
async function getNotDoneTask() {
  try {
    const response = await axios.get(
      "http://localhost:3000/add-task/?status=false"
    );
    const data = response.data;
    tableBody1.innerHTML = "";
    data.forEach((item) => {
      showNotDoneTask(item);
    });
  } catch (error) {
    console.log(error);
  }
}

//Function to show Done task
function showDoneTask(data) {
  const listItem = createTaskElement(data);
  tableBody2.appendChild(listItem);
}

//Function to show Not Done task
function showNotDoneTask(data) {
  const listItem = createTaskElement(data);
  tableBody1.appendChild(listItem);
}

//First time diplaying previous stored data
getDoneTask();
getNotDoneTask();

// postTask, getDonePost, and getNotDoneTask functions

//Posting Task
async function postTask(event) {
  event.preventDefault();
  const details = {
    name: name.value,
    description: description.value,
  };

  try {
    if (form.dataset.mode === "post" || form.dataset.mode === "") {
      const response = await axios.post(
        "http://localhost:3000/add-task",
        details
      );
    } else if (form.dataset.mode === "edit") {
      console.log("edit me");
      editTask(form.dataset.taskId, details);
    }
    getNotDoneTask();
    getDoneTask();
    form.reset();
  } catch (err) {
    console.error(err);
  }
}

//Function to delete task
async function deleteTask(taskId) {
  try {
    await axios.delete(`http://localhost:3000/delete-task/${taskId}`);
  } catch (error) {
    console.log(error);
  }
}

//Function to edit task
async function editTask(taskId, detail) {
  try {
    await axios.patch(`http://localhost:3000/edit-task/${taskId}`, detail);
    form.dataset.mode = "post";
    tableBody1.innerHTML = "";
    await getNotDoneTask();
    form.reset();
  } catch (error) {
    console.log(error);
  }
}

//Event happens on each button
function handleButton(event) {
  event.preventDefault();
  const target = event.target;
  const parentRow = target.closest(".row");
  if (!parentRow) return;
  const taskId = getItemId(parentRow);
  if (target.classList.contains("btn-success")) {
    changeStatus(taskId);
    parentRow.remove();
  } else if (target.classList.contains("btn-dark")) {
    editButtonClicked(taskId);
  } else if (target.classList.contains("btn-danger")) {
    changeStatus(taskId);
    parentRow.remove();
  } else if (target.classList.contains("btn-info")) {
    deleteTask(taskId);
    console.log("deleted");
    parentRow.remove();
  }
}

//Edit helper function
async function editButtonClicked(taskId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/single-task/${taskId}`
    );
    name.value = response.data.name;
    description.value = response.data.description;
    form.dataset.mode = "edit";
    form.dataset.taskId = taskId;
  } catch (error) {
    console.log(error);
  }
}

//Function to change the status of task
async function changeStatus(taskId) {
  try {
    await axios.patch(`http://localhost:3000/add-task/${taskId}`);
    getNotDoneTask();
    getDoneTask();
  } catch (error) {
    console.log(error);
  }
}

//Get itemId
function getItemId(parentRow) {
  return parentRow.dataset.id;
}

//Function to create task element
function createTaskElement(data) {
  const listItem = document.createElement("div");
  listItem.classList.add(
    "row",
    "mb-3",
    "p-2",
    "rounded-2",
    "border",
    "mx-auto",
    "mt-3"
  );
  listItem.style.width = "70%";
  listItem.dataset.id = data.id;
  listItem.innerHTML = `
      <div class="col-4 text-center">${data.name}</div>
      <div class="col-4 text-center">${data.description}</div>
      <div class="col-4 d-flex gap-2 justify-content-center">
        <button class="btn btn-${data.isDone ? "danger" : "success"}">${
    data.isDone ? "Undo" : "Done"
  }</button>
  <button class="btn btn-${data.isDone ? "info" : "dark"}">${
    data.isDone ? "Remove" : "Edit"
  }</button>
      </div>
    `;
  return listItem;
}
