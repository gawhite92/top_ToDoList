export { populateProjects, populateTasks, clearProjects, clearTasks }
import { database } from "./testdata.js"


function populateProjects() {
    console.log('Populating project list.');
    const projectsList = document.getElementById("projectslist");

    for (let i = 0; i < database.length; i++) {
        const projectContainer = document.createElement("div");
        projectContainer.setAttribute("class", "projectcontainer");

        const projectIcon = document.createElement("div");
        projectIcon.setAttribute("class", "projecticon");

        const projectTitle = document.createElement("div");
        projectTitle.setAttribute("class", "projecttitle");
        projectTitle.innerText = database[i].title;

        projectsList.appendChild(projectContainer);
        projectContainer.appendChild(projectIcon);
        projectContainer.appendChild(projectTitle);

        const projects = document.querySelectorAll(".projecttitle");

        projects.forEach((project) => {
            project.addEventListener("click", () => {
                const selectedProjectTitle = project.innerText
                console.log(selectedProjectTitle);
                const selectedProject = database.findIndex(project => project.title == selectedProjectTitle);
                console.log(selectedProject);
                clearTasks();
                populateTasks(selectedProject);
            })
        });
    }
}

function populateTasks(activeProjectIndex) {
    if (activeProjectIndex == undefined) {
        const toDoListHeader = document.getElementById("toDoListHeader");
        const selectedProjectTitle = toDoListHeader.innerText;
        const selectedProject = database.findIndex(project => project.title == selectedProjectTitle);
        activeProjectIndex = selectedProject
    }

    console.log(`Populating project ${activeProjectIndex} list.`);
    const toDoGroupContainer = document.getElementById("todogroupcontainer");

    let activeProjectTasks = database[activeProjectIndex].tasks
    console.log(`There is ${activeProjectTasks.length} tasks in this project.`);

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