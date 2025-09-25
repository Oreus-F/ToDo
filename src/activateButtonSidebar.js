import { createDialogProjectName, activateFormNewProject, createDialogEditUser, activateEditUser, createDialogNewTask } from "./dialogCreationDOM";


const switchDataAttribute = function(target, content){
    let data = target.getAttribute(`data-${content}`);
    data = data === 'true' ? false : true;
    target.setAttribute(`data-${content}`, data)
}


const setUpAddProjectButton = function(){
    const addProjectButton = document.querySelector('#addProjectButton');

    addProjectButton.addEventListener('click', () => {
        createDialogProjectName();
        activateFormNewProject();
    })
};


const setUpEditUserButton = function(){
    const editUserButton  = document.querySelector('#editUserButton');

    editUserButton.addEventListener('click', () => {
        createDialogEditUser();
        activateEditUser();
        activateButtonResetLocalStorage();
    })
}


const activateButtonResetLocalStorage = function(){
    const resetData = document.querySelector('#reset-personnal-data');

    resetData.addEventListener('click', () => {
        if(window.confirm('Warning : You will reset your actual username, profile picture and delete all of you projects and tasks. Do you want to continue ?')){
            localStorage.clear();
            window.location.reload();
        }
    })
}


const setUpDisplaySidebar = function(){
    const displaySidebarButton = document.querySelector('#displaySidebarButton');

    displaySidebarButton.addEventListener('click', (event) => {
        let target = event.target;
        target = target.parentElement;

        switchDataAttribute(target, 'sidebar')
    });
}


const setUpDisplayProjects = function(){
    const displayProjectsButton = document.querySelector('#displayProjectsButton');
    
    displayProjectsButton.addEventListener('click', () => {
        const projectContainer = document.querySelector('#projects-container');
        const chevronIcon = document.querySelector('#chevron-icon');

        switchDataAttribute(projectContainer, 'projects');
        switchDataAttribute(chevronIcon, 'projects');
    })
}


const setUpAddTaskButton = function(){
    const button = document.querySelector('#newTaskOpenModal');

    button.addEventListener('click', () => {
        const body = document.querySelector('body');
        body.appendChild(createDialogNewTask())
    })
}

const activateSidebarButtons = function(){
    setUpAddProjectButton();
    setUpEditUserButton();
    setUpDisplaySidebar();
    setUpDisplayProjects();
    setUpAddTaskButton();
}

export {activateSidebarButtons}