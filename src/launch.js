import { activateSidebarButtons } from "./activateButtonSidebar";
import { ProjectManager } from "./projectManager";
import { updateSidebarProjectList } from "./updateDOMProjectSidebar";
import { launchStorage } from "./localStorage";
import { createTemplate_Today } from "./todayButton";


const control = ProjectManager();

const launchPage = function(){
    activateSidebarButtons();

    launchStorage();

    

}


export {launchPage}