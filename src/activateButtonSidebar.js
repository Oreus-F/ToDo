import { createDialogProjectName, activateFormNewProject, createDialogEditUser, activateEditUser } from "./sidebarDialogCreationDOM";
import { displayContent } from "./sidebarButtonHelperDOM";

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

        displayContent(target, 'sidebar')
    });
}


const setUpDisplayProjects = function(){
    const displayProjectsButton = document.querySelector('#displayProjectsButton');
    
    displayProjectsButton.addEventListener('click', () => {
        const projectContainer = document.querySelector('#projects-container');
        const chevronIcon = document.querySelector('#chevron-icon');

        displayContent(projectContainer, 'projects');
        displayContent(chevronIcon, 'projects');
    })
}



const activateSidebarButtons = function(){
    setUpAddProjectButton();
    setUpEditUserButton();
    setUpDisplaySidebar();
    setUpDisplayProjects();
}

export {activateSidebarButtons}