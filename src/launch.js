import { activateSidebarButtons } from "./activateButtonSidebar";
import { ProjectManager } from "./projectManager";
import { updateSidebarProjectList } from "./updateDOMProjectSidebar";
import { launchStorage } from "./localStorage";



const control = ProjectManager();

const launchPage = function(){
    launchStorage();


    updateSidebarProjectList(control.getProjectList())
    activateSidebarButtons();
}


export {launchPage}