import { createContentTemplate, displayTasks } from "./contentTemplate";
import { format } from "date-fns";
import { createInlineAddTask } from "./addTask";
import { ProjectManager } from "./projectManager";


const control = ProjectManager();


const displayProject = function(projectTitle){
    const content = document.querySelector('#content');
    
    
    const TODAY = new Date();
    
    const project = control.getProject(projectTitle);
    const taskList = project.getTasksList();

    const TITLE_SECTION = projectTitle;
    const TODAY_DATE = format(TODAY, 'dd/MM/yyyy');
    const HEADER_DESCRIPTION = `${taskList.length} tasks in ${projectTitle} !`
    
    content.appendChild(createContentTemplate(TITLE_SECTION, TODAY_DATE, HEADER_DESCRIPTION));
    content.setAttribute('data-displayed', 'projects');
    content.setAttribute('data-project', projectTitle);

    const taskContainer = document.querySelector('#taskContainer');

    taskContainer.appendChild(createInlineAddTask());
    
    displayTasks(taskList)
}

export {displayProject}