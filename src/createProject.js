export {showAddProjectForm}
import {newProject, activateListeners} from './index.js'
import {populateProjects, clearProjects, highlightSelectedProject} from './populate.js';

const addProjectButton = document.getElementById("addprojectbutton");
addProjectButton.addEventListener("click", () => {
    showAddProjectForm();
});

function showAddProjectForm() {
    console.log('Open project form')

    const projectFormContainer = document.getElementById("projectFormContainer");

    if (projectFormContainer.hasChildNodes()) {  //Removes form if already open
        console.log('Removing project form')
        while (projectFormContainer.lastElementChild) {
            projectFormContainer.removeChild(projectFormContainer.lastElementChild);
        }
        return
    }

    const projectForm = document.createElement("form");
    projectForm.setAttribute("id", "newProjectForm");

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "projectTitleInput");
    titleInput.setAttribute("placeholder", "Project name");
    titleInput.setAttribute("required", "");

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("id", "submitNewProjectButton");
    submitButton.setAttribute("type", "button");

    projectFormContainer.appendChild(projectForm);

    projectForm.appendChild(titleInput);
    projectForm.appendChild(submitButton);

    const submitNewProjectButton = document.getElementById("submitNewProjectButton");
    submitNewProjectButton.addEventListener("click", () => {
        newProject();
        showAddProjectForm();
        clearProjects();
        populateProjects();
        activateListeners();
        highlightSelectedProject();
        });
}