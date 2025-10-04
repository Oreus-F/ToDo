import { createContentTemplate, displayTasks } from "./contentTemplate";
import { ProjectManager } from "./projectManager";
import { format } from "date-fns";
import { createInlineAddTask } from "./addTask";


const control = ProjectManager();

const displayInbox = function(){
    const content = document.querySelector('#content');
    
    const TODAY = new Date();
    
    const projectList = control.getProjectList();
    const inboxTasks = projectList[0].getTasksList();
    
    const TITLE_SECTION = "Inbox";
    const TODAY_DATE = format(TODAY, 'dd/MM/yyyy');
    const HEADER_DESCRIPTION = `${inboxTasks.length} tasks in Inbox !`
    
    content.appendChild(createContentTemplate(TITLE_SECTION, TODAY_DATE, HEADER_DESCRIPTION));
    content.setAttribute('data-displayed', 'inbox');

    const taskContainer = document.querySelector('#taskContainer');

    taskContainer.appendChild(createInlineAddTask());
    
    displayTasks(inboxTasks)
}



export {displayInbox}