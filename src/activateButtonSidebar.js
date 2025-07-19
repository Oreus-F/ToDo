import { createDialogProjectName, activateFormNewProject } from "./sidebarDialogCreationDOM";
import { displaySidebar } from "./sidebarButtonHelperDOM";

const setUpAddProjectButton = function(){
    const addProjectButton = document.querySelector('#addProjectButton');

    addProjectButton.addEventListener('click', () => {
        createDialogProjectName();
        activateFormNewProject();
    })
};


const setUpDisplaySidebar = function(){
    const displaySidebarButton = document.querySelector('#displaySidebarButton');

    displaySidebarButton.addEventListener('click', (event) => {
        let target = event.target;
        target = target.parentElement;

        displaySidebar(target)
    });
}


const activateSidebarButtons = function(){
    setUpAddProjectButton()
    setUpDisplaySidebar();
}

export {activateSidebarButtons}