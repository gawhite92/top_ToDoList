export { populateProjects, populateTasks, clearProjects, clearTasks, highlightSelectedProject }
import { database } from "./testdata.js"
import { getSelectedProject, activateListeners } from "./index.js";


function populateProjects() {
    console.log('Populating project list.');
    const projectsList = document.getElementById("projectslist");

    for (let i = 0; i < database.length; i++) {
        const projectContainer = document.createElement("div");
        projectContainer.setAttribute("class", "projectcontainer");

        const projectLeftContainer = document.createElement("div");
        projectLeftContainer.setAttribute("class", "projectleftcontainer");
        
        const projectIcon = document.createElement("div");
        projectIcon.setAttribute("class", "projecticon");

        const projectTitle = document.createElement("div");
        projectTitle.setAttribute("class", "projecttitle");
        projectTitle.innerText = database[i].title;

        const projectRightContainer = document.createElement("div");
        projectRightContainer.setAttribute("class", "projectrightcontainer");

        const editProjectButton = document.createElement("button");
        editProjectButton.setAttribute("class", "projectEditButton");

        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.setAttribute("class", "projectDeleteButton");

        projectsList.appendChild(projectContainer);
        projectContainer.appendChild(projectLeftContainer);
        projectLeftContainer.appendChild(projectIcon);
        projectLeftContainer.appendChild(projectTitle);
        projectContainer.appendChild(projectRightContainer);
        projectRightContainer.appendChild(editProjectButton);
        projectRightContainer.appendChild(deleteProjectButton);

    }
}

function highlightSelectedProject() {
    const toDoListHeader = document.getElementById("toDoListHeader");
    const selectedProjectTitle = toDoListHeader.innerText;
    const projects = document.querySelectorAll(".projecttitle");

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].innerText == selectedProjectTitle) {
            projects[i].parentElement.parentElement.setAttribute("class", "projectcontainer selected");
        }
    }
}

function populateTasks(activeProjectIndex) {
    if (activeProjectIndex == undefined) {
        const toDoListHeader = document.getElementById("toDoListHeader");
        const selectedProjectTitle = toDoListHeader.innerText;
        const selectedProject = database.findIndex(project => project.title == selectedProjectTitle);
        activeProjectIndex = selectedProject
    }

    const toDoGroupContainer = document.getElementById("todogroupcontainer");

    let activeProjectTasks = database[activeProjectIndex].tasks

    for (let i = 0; i < activeProjectTasks.length; i++) {
        const toDoContainer = document.createElement("div");
        toDoContainer.setAttribute("class", "todocontainer");

        const toDoLeftContainer = document.createElement("div");
        toDoLeftContainer.setAttribute("class", "todoleftcontainer");

        const toDoCheckbox = document.createElement("button");
        toDoCheckbox.setAttribute("class", "todocheckbox");

        const title = document.createElement("div");
        title.setAttribute("class", "title");
        title.innerText = activeProjectTasks[i].title;
        title.setAttribute("title", activeProjectTasks[i].description)

        const toDoRightContainer = document.createElement("div");
        toDoRightContainer.setAttribute("class", "todorightcontainer");

        const priority = document.createElement("div");
        priority.setAttribute("class", "priority");
        priority.innerText = activeProjectTasks[i].priority;

        const dueDate = document.createElement("div");
        dueDate.setAttribute("class", "duedate");
        dueDate.innerText = activeProjectTasks[i].dueDate;

        const editToDoButton = document.createElement("button");
        editToDoButton.setAttribute("class", "edittodobutton");

        const deleteToDoButton = document.createElement("button");
        deleteToDoButton.setAttribute("class", "deletetodobutton");

        if (activeProjectTasks[i].active == false) {
            toDoContainer.setAttribute("class", "todocontainer complete");
            toDoCheckbox.setAttribute("class", "todocheckbox complete");
        }

        toDoGroupContainer.appendChild(toDoContainer);

        toDoContainer.appendChild(toDoLeftContainer);
        toDoLeftContainer.appendChild(toDoCheckbox);
        toDoLeftContainer.appendChild(title);

        toDoContainer.appendChild(toDoRightContainer);
        toDoRightContainer.appendChild(priority);
        toDoRightContainer.appendChild(dueDate);
        toDoRightContainer.appendChild(editToDoButton);
        toDoRightContainer.appendChild(deleteToDoButton);
    }

    const addTaskButton = document.getElementById("addtaskbutton");
    addTaskButton.removeAttribute("class", "hidden");

    const toDoListHeader = document.getElementById("toDoListHeader");
    toDoListHeader.innerText = database[activeProjectIndex].title;
}

////////////////////////////////////////////////////////////////////////

function clearTasks() {
    const toDoGroupContainer = document.getElementById("todogroupcontainer");

    while (toDoGroupContainer.lastElementChild) {
        toDoGroupContainer.removeChild(toDoGroupContainer.lastElementChild);
    }
}

function clearProjects() {
    const projectsList = document.getElementById("projectslist");

    while (projectsList.lastElementChild) {
        projectsList.removeChild(projectsList.lastElementChild);
    }
}