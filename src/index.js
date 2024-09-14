import "./styles.css";
import { format } from 'date-fns'

import { showAddTaskForm } from "./createTask.js"
import { showAddProjectForm } from "./createProject.js"
import { populateProjects, populateTasks, clearProjects, clearTasks } from "./populate.js"
import { database } from "./testdata.js"

export { newProject, newTask, populateProjects, populateTasks }

// PROJECT CONSTRUCTOR

function Project(title) {
    this.title = title
    this.tasks = []
}

function newProject() {
    const title = document.getElementById("projectTitleInput");

    if (title.value == '') {
        console.log('Insufficient information')
        return
    }

    const newProject = new Project(title.value); // uses constructor to create project
    database.push(newProject); // adds new project to database
    console.table(database);
}

// TASK CONSTRUCTOR

function Task(title, description, priority, dueDate) {
    this.title = title,
        this.description = description,
        this.priority = priority,
        this.dueDate = dueDate,
        this.createdDate = format(new Date(), "dd/MM/yyyy")
    this.active = true
}

function newTask() {
    const title = document.getElementById("taskTitleInput");
    const description = document.getElementById("taskDescriptionInput");
    const priority = document.getElementById("taskPriorityInput");
    const dueDate = document.getElementById("taskDueDateInput");

    const toDoListHeader = document.getElementById("toDoListHeader"); //Quick and dirty. Better to make an 'activeProject' variable and assign the project index value.
    const selectedProjectName = toDoListHeader.textContent;

    const formattedDueDate = format(dueDate.value, "dd/MM/yyyy")

    const selectedProject = database.find(project => project.title == selectedProjectName);

    if (title.value == '') {
        console.log('Insufficient information')
        return
    }

    console.log(title.value, description.value, priority.value, formattedDueDate) //TEST

    const newTask = new Task(title.value, description.value, priority.value, formattedDueDate); // uses constructor to create task
    selectedProject.tasks.push(newTask); // adds new task to database
    console.log(selectedProject.title); //TEST
    console.table(selectedProject.tasks); //TEST
}

populateProjects();
populateTasks(0);