import { activateSidebarButtons } from "./activateButtonSidebar";
import { ProjectManager } from "./projectManager";
import { updateSidebarProjectList } from "./updateDOMProjectSidebar";



const control = ProjectManager();

const launchPage = function(){

    updateSidebarProjectList(control.getProjectList())
    activateSidebarButtons();
}


export {launchPage}