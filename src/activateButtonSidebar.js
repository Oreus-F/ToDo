import { createDialogProjectName, activateFormNewProject } from "./sidebarDialogCreationDOM";

const setUpAddProjectButton = function(){
    const addProjectButton = document.querySelector('#addProjectButton');

    addProjectButton.addEventListener('click', () => {
        createDialogProjectName();
        activateFormNewProject();
    })
};



export {setUpAddProjectButton}