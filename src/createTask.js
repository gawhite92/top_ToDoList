export {showAddTaskForm}
import {newTask } from './index.js'
import {populateTasks, clearTasks} from './populate.js';

const addTaskButton = document.getElementById("addtaskbutton");
addTaskButton.addEventListener("click", () => {
    showAddTaskForm();
});

function showAddTaskForm() {
    console.log('Open task form')

    const taskFormContainer = document.getElementById("taskFormContainer");

    if (taskFormContainer.hasChildNodes()) {  //Removes form if already open
        console.log('Removing form')
        while (taskFormContainer.lastElementChild) {
            taskFormContainer.removeChild(taskFormContainer.lastElementChild);
        }
        return
    }

    const taskForm = document.createElement("form");
    taskForm.setAttribute("id", "taskForm");

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "taskTitleInput");
    titleInput.setAttribute("placeholder", "Title");
    titleInput.setAttribute("required", "");

    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.setAttribute("id", "taskDescriptionInput");
    descriptionInput.setAttribute("placeholder", "Description");
    descriptionInput.setAttribute("required", "");

    const prioritySelector = document.createElement("select");
    prioritySelector.setAttribute("name", "priority");
    prioritySelector.setAttribute("id", "taskPriorityInput");
    
    const priorityOption1 = document.createElement("option");
    priorityOption1.setAttribute("value", "Normal");
    priorityOption1.textContent = "Normal";

    const priorityOption2 = document.createElement("option");
    priorityOption2.setAttribute("value", "High");
    priorityOption2.textContent = "High";

    const priorityOption3 = document.createElement("option");
    priorityOption3.setAttribute("value", "Urgent");
    priorityOption3.textContent = "Urgent";

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.setAttribute("id", "taskDueDateInput");
    dueDateInput.setAttribute("placeholder", "Due Date");
    dueDateInput.setAttribute("required", "");

    const submitNewTaskButton = document.createElement("button");
    submitNewTaskButton.textContent = "Submit";
    submitNewTaskButton.setAttribute("id", "submitNewTask");
    submitNewTaskButton.setAttribute("type", "button");

    taskFormContainer.appendChild(taskForm);
    
    taskForm.appendChild(titleInput);
    taskForm.appendChild(descriptionInput);
    taskForm.appendChild(prioritySelector);
    prioritySelector.appendChild(priorityOption1);
    prioritySelector.appendChild(priorityOption2);
    prioritySelector.appendChild(priorityOption3);
    taskForm.appendChild(dueDateInput);
    taskForm.appendChild(submitNewTaskButton);

    submitNewTaskButton.addEventListener("click", () => {
        newTask();
        showAddTaskForm();
        clearTasks();
        populateTasks();
})
}