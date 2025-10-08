import { createContentTemplate, displayUpcommingTasks } from "./contentTemplate";
import { ProjectManager } from "./projectManager";
import { format, isAfter } from "date-fns";
import { createInlineAddTask } from "./addTask";


const control = ProjectManager();

const displayUpcomming = function(){
    const content = document.querySelector('#content');
    
    const TODAY = new Date();
    
    const tasksList = control.getAllTasks();
    const upcommingList = tasksList.filter(task => (isAfter(task.dueDate,TODAY) && (task.status === 'to-do')));

    
    const TITLE_SECTION = "Upcomming";
    const TODAY_DATE = format(TODAY, 'dd/MM/yyyy');
    const HEADER_DESCRIPTION = `${upcommingList.length} tasks incomming !`;
    
    content.appendChild(createContentTemplate(TITLE_SECTION, TODAY_DATE, HEADER_DESCRIPTION));
    content.setAttribute('data-displayed', 'upcomming');

    const taskContainer = document.querySelector('#taskContainer');

    taskContainer.appendChild(createInlineAddTask());
    
    displayUpcommingTasks(upcommingList);
}



export {displayUpcomming}