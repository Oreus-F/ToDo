import { ProjectManager } from "./projectManager";
import {updateSidebarProjectList } from "./updateDOMProjectSidebar.js"

const control = ProjectManager();



const createDialogProjectName = function(){
    const dialog = document.createElement('dialog');
    dialog.setAttribute("id", "getProjectName");

    const form = document.createElement('form');
    form.setAttribute('class', 'full-h');
    form.setAttribute('id', 'newProject');

    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction gap-16 full-h');

    const label = document.createElement('label');
    label.setAttribute('class', 'fs14');
    label.setAttribute('for', 'newProjectName');
    label.textContent = 'New project name :';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('required', 'true');
    input.setAttribute('id', 'name');
    input.setAttribute('name', 'name');
    input.setAttribute('placeholder', 'Project 404');
    input.setAttribute('class', 'flex-first-grow fs11 input-project-name');

    const button = document.createElement('button');

    button.setAttribute('class', 'button-project-name');
    button.textContent = 'Create';


    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(button);

    form.appendChild(div);

    dialog.appendChild(form);

    const body = document.querySelector('body');
    body.appendChild(dialog)
}



const sendNewProject = function(event){
    const dialog = document.querySelector('#getProjectName');

    event.preventDefault();

    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData.entries())

    control.newProject(formData.name);  
    
    dialog.close()
}



const activateFormNewProject = function(){
    const form = document.querySelector('#newProject');

    form.addEventListener('submit', sendNewProject)
}



export {activateFormNewProject}