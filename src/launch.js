import { activateSidebarButtons } from "./activateButtonSidebar";
import { ProjectManager } from "./projectManager";
import { updateSidebarProjectList } from "./updateDOMProjectSidebar";
import { launchStorage } from "./localStorage";
import { displayToday } from "./todayButton";


const control = ProjectManager();

const launchPage = function(){
    
    launchStorage();
    activateSidebarButtons();

    displayToday();
}


export {launchPage}