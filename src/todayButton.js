import { createContentTemplate, taskTemplate } from "./contentTemplate";
import { ProjectManager } from "./projectManager";
import { format, isToday } from "date-fns";

const control = ProjectManager()

const displayToday = function(){
    const content = document.querySelector('#content');
    content.setAttribute('data-displayed', 'today');

    
    const tasksList = control.getAllTasks();
    const todayList = tasksList.filter(task => isToday(task.dueDate));
    
    const TITLE_SECTION = "Today";
    const TODAY_DATE = format(new Date(), 'dd/MM/yyyy');
    const HEADER_DESCRIPTION = `${todayList.length} tasks for today !`

    content.appendChild(createContentTemplate(TITLE_SECTION, TODAY_DATE, HEADER_DESCRIPTION));


    createAddTask();
    
    displayTasksToday(todayList)
}


const createAddTask = function(){
    console.log('creéer un bouton pour ajouter une nouvelle tasks')
}


const displayTasksToday = function(todayList){

    const taskContainer = document.querySelector('#taskContainer');

    if(todayList.length > 0){

        const taskListContainer = document.createElement('ul');
        taskListContainer.setAttribute('id', 'taskListContainer')
        taskListContainer.setAttribute('class', 'taskList-container')
        
        for(let x=0; x < todayList.length; x++){

            const actualTask = todayList[x];
            
            taskListContainer.appendChild(taskTemplate(actualTask))
        }

        taskContainer.appendChild(taskListContainer)

    } else {
        taskContainer.appendChild(displayNoTask());
    }


}


const displayNoTask = function(){

    const div = document.createElement('div');
    div.setAttribute('id', 'noTaskContainer');
    div.setAttribute('class', 'flex-display full-h aligned-item-center justif-content-center');

    div.appendChild(displayNoTaskText())
    
    return div
}


const displayNoTaskText = function(){

    const div = document.createElement('div');
    div.setAttribute('class', 'text-align-center fs11')
    
    const p1 = document.createElement('p');
    p1.textContent = 'No task today ?';
    p1.setAttribute('class', 'fs14 bold-text text-color-ascent')
    
    const p2 = document.createElement('p');
    p2.textContent = 'You can create a new one by clicking on "Add Task"';

    const p3 = document.createElement('p');
    p3.textContent = "Or maybe it's a sign to relax, take your time";


    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    return div
}


export {displayToday}