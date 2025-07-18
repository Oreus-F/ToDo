



const createDialogProjectName = function(){
    const dialog = document.createElement('dialog');
    dialog.setAttribute("id", "getProjectName");

    const form = document.createElement('form');
    form.setAttribute('class', 'full-h');

    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction gap-16 full-h');

    const label = document.createElement('label');
    label.setAttribute('class', 'fs14');
    label.setAttribute('for', 'newProjectName');
    label.textContent = 'New project name :';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('required', 'true');
    input.setAttribute('id', 'newProjectName');
    input.setAttribute('name', 'newProjectName');
    input.setAttribute('placeholder', 'Project 404');
    input.setAttribute('class', 'flex-first-grow fs11 input-project-name');

    const button = document.createElement('button');
    button.setAttribute('id', 'newProject')
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


const activateButtonProjectName = function(){
    const button = document.querySelector('#newProjectName');

    button.addEventListener('click', () => {
        
    })
}