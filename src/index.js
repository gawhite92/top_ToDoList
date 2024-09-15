import "./styles.css";
import { format } from 'date-fns'

import { showAddTaskForm } from "./createTask.js"
import { showAddProjectForm } from "./createProject.js"
import { populateProjects, populateTasks, clearProjects, clearTasks, highlightSelectedProject } from "./populate.js"
import { database } from "./testdata.js"

export { newProject, newTask, populateProjects, populateTasks, getSelectedProject, activateListeners }

// PROJECT CONSTRUCTOR

function Project(title) {
    this.title = title,
        this.tasks = []
}

function newProject() {
    const title = document.getElementById("projectTitleInput");

    if (title.value == '') {
        alert('Title required')
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

    if (dueDate.value == '') {
        alert('Invalid date');
        return
    }

    const formattedDueDate = format(dueDate.value, "dd/MM/yyyy")

    if (title.value == '') {
        alert('Title required')
        return
    }

    console.log(title.value, description.value, priority.value, formattedDueDate) //TEST

    const newTask = new Task(title.value, description.value, priority.value, formattedDueDate); // uses constructor to create task

    const selectedProject = getSelectedProject().selectedProject;
    console.log(selectedProject);
    console.log(selectedProject === '')

    if (selectedProject === '') {
        console.log('No project selected.')
        return
    }

    database[selectedProject].tasks.push(newTask); // adds new task to database
    console.table(database);
}

// SELECTED PROJECT

function getSelectedProject() {
    const toDoListHeader = document.getElementById("toDoListHeader"); //Quick and dirty. Better to make an 'activeProject' variable and assign the project index value.
    const selectedProjectName = toDoListHeader.textContent;

    if (toDoListHeader.textContent == '') {
        console.log('No project selected.')
        const selectedProject = '';
        return { selectedProject }
    }

    const selectedProject = database.findIndex(project => project.title == selectedProjectName);
    return { selectedProject }
}

// LISTENERS

function activateListeners() {
    console.log('Listeners activating / refreshing.');

    //PROJECT SELECTOR
    const projects = document.querySelectorAll(".projecttitle");

    projects.forEach((project) => {
        project.addEventListener("click", () => {
            const selectedProjectTitle = project.innerText;
            console.log(`Selected project title is: ${selectedProjectTitle}`);
            const selectedProject = database.findIndex(project => project.title == selectedProjectTitle);
            console.log(`Selected project index number is: ${selectedProject}`);
            clearProjects();
            clearTasks();
            populateProjects();
            populateTasks(selectedProject);
            activateListeners();
            highlightSelectedProject();
        })
    }
    );

    //TASK DELETE BUTTONS
    const deleteButtons = document.querySelectorAll(".deletetodobutton");

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", () => {
            // if(confirm('Delete task?')){ GIVE WARNING BEFORE PERMANENTLY DELETING
            console.log(getSelectedProject().selectedProject)
            const selectedProject = database[getSelectedProject().selectedProject]
            selectedProject.tasks.splice(i, 1);
            clearTasks();
            populateTasks(getSelectedProject().selectedProject);
            activateListeners();
            // }
        })
    }

    //PROJECT DELETE BUTTONS
    const projectDeleteButtons = document.querySelectorAll(".projectDeleteButton");

    for (let i = 0; i < projectDeleteButtons.length; i++) {
        projectDeleteButtons[i].addEventListener("click", () => {
            // if(confirm('Delete project?')){ //GIVE WARNING BEFORE PERMANENTLY DELETING
            database.splice(i, 1);
            clearTasks();
            clearProjects();
            populateProjects();
            activateListeners();
            // }
        })
    }

        //PROJECT EDIT BUTTONS
    const projectEditButtons = document.querySelectorAll(".projectEditButton");

    for (let i = 0; i < projectEditButtons.length; i++) {
        projectEditButtons[i].addEventListener("click", () => {
            const parent = projectEditButtons[i].parentElement;
            console.log(parent)
            const child = document.getElementsByClassName("editFormTitleInput")
            console.log(child)


            if (parent.contains(child)) {
                console.log('hi');
                return
            }

            const selectedEditButton = projectEditButtons[i];
            const editFormTitleInput = document.createElement('input');
            editFormTitleInput.setAttribute("class", "editFormTitleInput")
            selectedEditButton.parentElement.append(editFormTitleInput);
        })
    }

    //CHECKBOXES

    const checkboxes = document.querySelectorAll(".todocheckbox");

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", () => {
            const selectedProject = database[getSelectedProject().selectedProject]
            const selectedTask = checkboxes[i];

            if(selectedProject.tasks[i].active){
            selectedProject.tasks[i].active = false;
            //Visual changes occur temporarily without reloading entire task list, but are reloaded the same way if project list changes.
            selectedTask.setAttribute("class", "todocheckbox complete");
            selectedTask.parentElement.parentElement.setAttribute("class", "todocontainer complete")
            } else {
                selectedProject.tasks[i].active = true;
                selectedTask.setAttribute("class", "todocheckbox");
                selectedTask.parentElement.parentElement.setAttribute("class", "todocontainer")
            }            
            
            // clearTasks();
            // populateTasks(getSelectedProject().selectedProject);
            // activateListeners();
        })
    }
}

(function pageFirstInitialise() {
    populateProjects();
    populateTasks(0); //Initialises page with first project task list.
    activateListeners();
    highlightSelectedProject();
})();