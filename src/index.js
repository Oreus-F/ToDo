import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';
import { displayToday } from "./todayButton";





launchPage();

const control = ProjectManager();
const tasksList = control.getAllTasks();
console.log(tasksList);

displayToday();
