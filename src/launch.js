import { activateSidebarButtons } from "./activateButtonSidebar";
import { ProjectManager } from "./projectManager";
import { updateSidebarProjectList } from "./updateDOMProjectSidebar";
import { launchStorage } from "./localStorage";
import { displayToday } from "./todayButton";


const control = ProjectManager();

const launchPage = function(){
    
    launchStorage();
    activateSidebarButtons();

    const allTasks = control.getAllTasks();
    const allComplete = control.getAllCompleteTasks();

    if(allTasks.length === 0 && allComplete.length === 0){
        control.createFirstTask()
    }
    // METTRE CREATEFIRSTTASK IN LOCALSTORAGE FIRST LAUNCH

    const newtasks = control.getAllTasks();
    console.log(newtasks)

    displayToday();
}


export {launchPage}