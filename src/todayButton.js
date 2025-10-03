import { createContentTemplate, displayTasks } from "./contentTemplate";
import { ProjectManager } from "./projectManager";
import { format, isToday } from "date-fns";
import { createInlineAddTask } from "./addTask";

const control = ProjectManager()

const displayToday = function(){
    const content = document.querySelector('#content');
    
    const TODAY = new Date();
    
    const tasksList = control.getAllTasks();
    const todayList = tasksList.filter(task => (isToday(task.dueDate) && (task.status === 'to-do')));
    
    const TITLE_SECTION = "Today";
    const TODAY_DATE = format(TODAY, 'dd/MM/yyyy');
    const HEADER_DESCRIPTION = `${todayList.length} tasks for today !`
    
    content.appendChild(createContentTemplate(TITLE_SECTION, TODAY_DATE, HEADER_DESCRIPTION));
    content.setAttribute('data-displayed', 'today');

    const taskContainer = document.querySelector('#taskContainer');

    taskContainer.appendChild(createInlineAddTask());
    
    displayTasks(todayList)
}


export {displayToday}