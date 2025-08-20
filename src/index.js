import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';
import { displayToday } from "./todayButton";





launchPage();


displayToday();

const control = ProjectManager();

const projectList = control.getProjectList();
const allTasks = control.getAllTasks();
const allCompleted = control.getAllCompleteTasks();


console.log(projectList);
console.log(allTasks);
console.log(allCompleted)