import { createContentTemplate, displayTasks } from "./contentTemplate";
import { ProjectManager } from "./projectManager";
import { format} from "date-fns";
import { createInlineAddTask } from "./addTask";


const control = ProjectManager();

const displayCompleted = function(){
    const content = document.querySelector('#content');
    
    const TODAY = new Date();
    
    const tasksList = control.getAllCompleteTasks();
    
    const TITLE_SECTION = "Completed";
    const TODAY_DATE = format(TODAY, 'dd/MM/yyyy');
    const HEADER_DESCRIPTION = `${tasksList.length} tasks completed !`
    
    content.appendChild(createContentTemplate(TITLE_SECTION, TODAY_DATE, HEADER_DESCRIPTION));
    content.setAttribute('data-displayed', 'completed');

    const taskContainer = document.querySelector('#taskContainer');

    taskContainer.appendChild(createInlineAddTask());
    
    displayTasks(tasksList)
}



export {displayCompleted}