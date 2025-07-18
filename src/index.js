import './style.css'
import { ProjectManager } from "./projectManager";
import { updateSidebarProjectList } from './updateDOMProjectSidebar';
import { activateFormNewProject } from './dialogDOMcreation';

const control = ProjectManager();
updateSidebarProjectList(control.getProjectList())

// FOR PARSING INFORMATIONS
// const newInstance = function(value){
//     const instance = new Project(value.title, value.tasks);
//     instance.ParsingTasks();
//     return instance
// }

const getProjectName = document.querySelector('#getProjectName');
getProjectName.showModal();


activateFormNewProject()