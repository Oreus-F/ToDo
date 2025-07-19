import './style.css'
import { ProjectManager } from "./projectManager";
import { updateSidebarProjectList } from './updateDOMProjectSidebar';
import { activateSidebarButtons } from './activateButtonSidebar';

const control = ProjectManager();
updateSidebarProjectList(control.getProjectList())

// FOR PARSING INFORMATIONS
// const newInstance = function(value){
//     const instance = new Project(value.title, value.tasks);
//     instance.ParsingTasks();
//     return instance
// }

activateSidebarButtons();