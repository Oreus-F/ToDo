import { ProjectManager } from "./projectManager";

const control = ProjectManager();



const createDialogProjectName = function(){
    const dialog = document.createElement('dialog');
    dialog.setAttribute("id", "getProjectName");
    dialog.setAttribute("class", "dialog")

    const form = document.createElement('form');
    form.setAttribute('class', 'full-h');
    form.setAttribute('id', 'newProject');

    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction gap-16 full-h');

    const label = document.createElement('label');
    label.setAttribute('class', 'fs14');
    label.setAttribute('for', 'name');
    label.textContent = 'New project name :';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('required', 'true');
    input.setAttribute('id', 'name');
    input.setAttribute('name', 'name');
    input.setAttribute('placeholder', 'Project 404');
    input.setAttribute('class', 'flex-first-grow fs11 input-look input-project-name');

    const button = document.createElement('button');

    button.setAttribute('class', 'button-project-name');
    button.textContent = 'Create';


    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(button);

    form.appendChild(div);

    dialog.appendChild(form);

    const body = document.querySelector('body');
    body.appendChild(dialog);

    dialog.showModal();
}


const createDialogEditUser = function(){
    const dialog = document.createElement('dialog');
    dialog.setAttribute("id", "editUserDialog");
    dialog.setAttribute('class', "dialog dialog-edit-user")

    const form = document.createElement('form');
    form.setAttribute('class', 'full-h');
    form.setAttribute('id', 'editUserForm');

    const container = document.createElement('div');
    container.setAttribute('class', 'full-h flex-display column-direction full-w gap-8');

    container.appendChild(createEditUser_DivPicture());
    container.appendChild(createEditUser_DivUsername());
    container.appendChild(createEditUser_DivResetStorage());


    const div = document.createElement('div');
    div.setAttribute('class', 'flex-basis80px flex-display justif-content-end');

    const button = document.createElement('button');
    button.setAttribute('class', 'button-edit-account');
    button.textContent = 'Edit Account';

    div.appendChild(button)
    container.appendChild(div);
    form.appendChild(container);
    dialog.appendChild(form)


    const body = document.querySelector('body');
    body.appendChild(dialog);

    dialog.showModal();
}


const createEditUser_DivPicture = function(){

    //container
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction pad1rem');

    //title
    const div_title = document.createElement('div');
    div_title.setAttribute('class', 'flex-basis40px flex-display aligned-item-center');

    const div_h2 = document.createElement('h2');
    div_h2.setAttribute('class', 'edit-user-title-container');
    div_h2.textContent = 'Profile picture';


    div_title.appendChild(div_h2);
    div.appendChild(div_title);


    //content
    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'grid-display edit-user-grid flex-first-grow pad1rem gap-8');

    const div_picture = document.createElement('div');
    div_picture.setAttribute('class', 'grid-area-header flex-display aligned-item-center justif-content-center');

    const img_preview = document.createElement('img');
    const currentPreview = localStorage.getItem('profilePicture');
    img_preview.setAttribute('src', currentPreview);
    img_preview.setAttribute('class', 'user-profile edit-preview-radius border-picture');
    img_preview.setAttribute('alt', 'preview of profile picture');
    img_preview.setAttribute('id', 'userPreviewPicture');

    div_picture.appendChild(img_preview);
    div_content.appendChild(div_picture);

    const div_interaction = document.createElement('div');
    div_interaction.setAttribute('class', 'grid-area-interaction flex-display aligned-item-end');

    const div_span_interaction = document.createElement('span');
    div_span_interaction.setAttribute('class', 'flex-first-grow');

    const div_input_interaction = document.createElement('input');
    div_input_interaction.setAttribute('type', 'file');
    div_input_interaction.setAttribute('id', 'fileUploader');
    div_input_interaction.setAttribute('name', 'fileUser');

    // --------> Interactivity for preview


    div_input_interaction.addEventListener('change', () => {
        const file = fileUploader.files[0];
        const reader = new FileReader();


        if (file){
            readFileReader(file, reader, img_preview)
        }
    
})




    div_span_interaction.appendChild(div_input_interaction);
    div_interaction.appendChild(div_span_interaction);
    div_content.appendChild(div_interaction);


    const div_exp = document.createElement('div');
    div_exp.setAttribute('class', 'grid-area-explaination fs-09rem');
    
    const div_span_exp = document.createElement('span');
    div_span_exp.textContent = 'Change your profile picture';

    div_exp.appendChild(div_span_exp);
    div_content.appendChild(div_exp);

    div.appendChild(div_content);


    return div
}


const createEditUser_DivUsername = function(){

    //container
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction gap-8 pad1rem');

    //title
    const div_title = document.createElement('div');
    div_title.setAttribute('class', 'flex-basis40px flex-display aligned-item-center');

    const div_h2 = document.createElement('h2');
    div_h2.setAttribute('class', 'edit-user-title-container');
    div_h2.textContent = 'User informations';


    div_title.appendChild(div_h2);
    div.appendChild(div_title);


    //content
    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'grid-display edit-user-grid flex-first-grow pad1rem gap-8');

    const div_title_h3 = document.createElement('div');
    div_title_h3.setAttribute('class', 'grid-area-header');

    const h3 = document.createElement('h3');
    h3.setAttribute('class', 'edit-user-title-content');
    h3.textContent = 'Username';


    div_title_h3.appendChild(h3);
    div_content.appendChild(div_title_h3);

    const div_interaction = document.createElement('div');
    div_interaction.setAttribute('class', 'grid-area-interaction');

    const div_span_interaction = document.createElement('span');
    div_span_interaction.setAttribute('class', 'flex-first-grow');

    const div_input_interaction = document.createElement('input');
    const currentUsername = localStorage.getItem('username');
    div_input_interaction.setAttribute('type', 'text');
    div_input_interaction.setAttribute('id', 'username');
    div_input_interaction.setAttribute('name', 'newUsername');
    div_input_interaction.setAttribute('class', 'input-look');
    div_input_interaction.setAttribute('placeholder', currentUsername);

    div_span_interaction.appendChild(div_input_interaction);
    div_interaction.appendChild(div_span_interaction);
    div_content.appendChild(div_interaction);


    const div_exp = document.createElement('div');
    div_exp.setAttribute('class', 'grid-area-explaination fs-09rem');
    
    const div_span_exp = document.createElement('span');
    div_span_exp.textContent = 'You can change your username here';

    div_exp.appendChild(div_span_exp);
    div_content.appendChild(div_exp);

    div.appendChild(div_content);


    return div
}


const createEditUser_DivResetStorage = function(){

    //container
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction gap-8 pad1rem');

    //title
    const div_title = document.createElement('div');
    div_title.setAttribute('class', 'flex-basis40px flex-display aligned-item-center');

    const div_h2 = document.createElement('h2');
    div_h2.setAttribute('class', 'edit-user-title-container');
    div_h2.textContent = 'Delete informations';


    div_title.appendChild(div_h2);
    div.appendChild(div_title);


    //content
    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'grid-display edit-user-grid flex-first-grow pad1rem gap-8');

    const div_title_h3 = document.createElement('div');
    div_title_h3.setAttribute('class', 'grid-area-header');

    const h3 = document.createElement('h3');
    h3.setAttribute('class', 'edit-user-title-content');
    h3.textContent = 'Reset data';


    div_title_h3.appendChild(h3);
    div_content.appendChild(div_title_h3);

    const div_interaction = document.createElement('div');
    div_interaction.setAttribute('class', 'grid-area-interaction');

    const div_span_interaction = document.createElement('span');
    div_span_interaction.setAttribute('class', 'flex-display gap-8');


    const button = document.createElement('button');
    button.setAttribute('class', 'button-reset-data flex-basis200px');
    button.setAttribute('id', 'reset-personnal-data');
    button.textContent = 'Personnal data';
    div_span_interaction.appendChild(button);


    div_interaction.appendChild(div_span_interaction);
    div_content.appendChild(div_interaction);


    const div_exp = document.createElement('div');
    div_exp.setAttribute('class', 'grid-area-explaination fs-09rem');
    
    const div_span_exp = document.createElement('span');
    div_span_exp.textContent = 'You can delete personnal informations / Projects and Tasks';

    div_exp.appendChild(div_span_exp);
    div_content.appendChild(div_exp);

    div.appendChild(div_content);


    return div
}


const sendNewUserData = function(event){
    const dialog = document.querySelector('#editUserDialog');
    const body = document.querySelector('body');

    event.preventDefault();

    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData.entries())

    const currentPreview = localStorage.getItem('profilePicture');
    const currentUsername = localStorage.getItem('username');


    if(formData.fileUser.size > 0) {
        const file = formData.fileUser;
        const reader = new FileReader();


        reader.addEventListener('load', () => {
            if(currentPreview !== reader.result){
                localStorage.setItem('profilePicture', reader.result)
            }
        });
    
        reader.readAsDataURL(file);

    };

    if(formData.newUsername && formData.newUsername.length > 0 && formData.newUsername !== currentUsername) {
        localStorage.setItem('username', formData.newUsername)
    };

    
    dialog.close();
    body.removeChild(dialog);
    window.location.reload();
}


const sendNewProject = function(event){
    const dialog = document.querySelector('#getProjectName');
    const body = document.querySelector('body');

    event.preventDefault();

    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData.entries())

    control.newProject(formData.name);  
    
    dialog.close();
    body.removeChild(dialog);
}


const activateEditUser = function(){
    const form = document.querySelector('#editUserForm');

    form.addEventListener('submit', sendNewUserData)
}


const activateFormNewProject = function(){
    const form = document.querySelector('#newProject');

    form.addEventListener('submit', sendNewProject)
}


const readFileReader = function(file, fileReader, target){
    fileReader.addEventListener('load', () => {
        target.setAttribute('src', fileReader.result);
    });
    
    fileReader.readAsDataURL(file);

    
}



export {createDialogProjectName, activateFormNewProject, createDialogEditUser, activateEditUser}