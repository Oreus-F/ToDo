import { ProjectManager } from "./projectManager";
import { createAddTaskPanel, updateTasksDisplayed } from "./addTask";

const control = ProjectManager();


const removeFromContent = function(){
    const content = document.querySelector('#content');
    content.removeAttribute('data-displayed');
    content.removeAttribute('data-project');
    content.replaceChildren();
}


const createContentTemplate = function(title, date, text){
    removeFromContent()


    const div = document.createElement('div');
    div.setAttribute('class', 'full-h flex-display column-direction');


    const headerDiv = document.createElement('div');
    headerDiv.setAttribute('class', 'flex-basis120px flex-display today-titleDiv-limits');

    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'flex-first-grow flex-display column-direction justif-content-center ');

    const titleSpan = document.createElement('span');
    titleSpan.setAttribute('class', 'flex-first-grow')

    const h1Title = document.createElement('h1');
    h1Title.setAttribute('class', 'fs4r');
    h1Title.textContent = title;


    titleSpan.appendChild(h1Title);
    titleDiv.appendChild(titleSpan);


    const divReminder = document.createElement('div');
    divReminder.setAttribute('class', 'flex-basis40px flex-display aligned-item-end justif-content-end');

    const spanIconReminder = document.createElement('span');
    spanIconReminder.setAttribute('class', 'flex-basis40px full-h icon-today-tasks');
    spanIconReminder.setAttribute('id', 'headerIconReminder');

    const spanTextReminder = document.createElement('span');
    spanTextReminder.setAttribute('class', 'flex-first-grow');
    spanTextReminder.textContent = text;


    divReminder.appendChild(spanIconReminder);
    divReminder.appendChild(spanTextReminder);

    titleDiv.appendChild(divReminder)


    const dateDiv = document.createElement('div');
    dateDiv.setAttribute('class', 'flex-basis200px flex-display justif-content-end aligned-item-end');

    const dateSpan = document.createElement('span');

    const h3Date = document.createElement('h3');
    h3Date.textContent = date;


    dateSpan.appendChild(h3Date);
    dateDiv.appendChild(dateSpan);

    headerDiv.appendChild(titleDiv);
    headerDiv.appendChild(dateDiv);


    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('class', 'flex-first-grow');
    contentDiv.setAttribute('id', 'taskContainer');
 
    

    div.appendChild(headerDiv);
    div.appendChild(contentDiv);


    return div
}


const taskTemplate = function(task){
    const taskListElement = document.createElement('li');
    taskListElement.setAttribute('class', 'taskList-Element');

    const taskContent = document.createElement('div');
    taskContent.setAttribute('class', 'flex-display column-direction gap-8 task-class');

    taskContent.appendChild(createUpDiv(task, taskListElement));
    taskContent.appendChild(createDownDiv(task, taskListElement));
    
    taskListElement.appendChild(taskContent)

    return taskListElement
    
}


const createUpDiv = function(task, taskContent){
    
    const upDiv = document.createElement('div');
    upDiv.setAttribute('class', 'flex-display flex-first-grow aligned-item-center gap-8')
    
    upDiv.appendChild(completeTaskButton(task, taskContent));

    const divTitle = document.createElement('div');
    divTitle.setAttribute('class', 'flex-first-grow fs12')
    const titleText = document.createElement('p');

    titleText.textContent = task.title;

    divTitle.appendChild(titleText);
    upDiv.appendChild(divTitle);


    upDiv.appendChild(createTaskButtons(task, taskContent));

    return upDiv
}


const removeTaskDOM = function(task){
    const taskListContainer = document.querySelector('#taskListContainer');

    taskListContainer.removeChild(task)
}


const completeTaskButton = function(task, taskContent){
    const div = document.createElement('div');

    const button = document.createElement('button');
    button.setAttribute('class', 'completed-button');

    const priority = task.priority;
    button.setAttribute('data-priority', priority);
    
    button.addEventListener('click', () => {

        control.completeSelectedTask(task);
        
        updateTasksDisplayed()

    })

    div.appendChild(button)

    return div

}


const createTaskButtons = function(task, taskContent){
    const div = document.createElement('div');
    div.setAttribute('class', ' full-h flex-display gap-8 flex-basis80px justif-content-end hide-task-button')

    div.appendChild(createEditTaskButton(task));
    div.appendChild(createDeleteTaskButton(task, taskContent));

    return div
}


const createEditTaskButton = function(task){
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display full-w')

    const button = document.createElement('button');
    button.setAttribute('data-inline', 'false');
    const inline = button.getAttribute('data-inline');
    button.setAttribute('class', 'flex-display justif-content-center full-w inside-task-button');
    
    button.addEventListener('click', ()=> {
        const body = document.querySelector('body');
        body.appendChild(createAddTaskPanel(inline, task));
    })

    const span = document.createElement('span');
    span.setAttribute('class', 'edit-task-icon task-icon-displayed flex-basis40px');


    button.appendChild(span);
    div.appendChild(button);

    return div
}


const createDeleteTaskButton = function(task, taskContent){
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display full-w')

    const button = document.createElement('button');
    button.setAttribute('class', 'flex-display full-w justif-content-center inside-task-button');

    const span = document.createElement('span');
    span.setAttribute('class', 'delete-task-icon task-icon-displayed flex-basis40px');


    button.addEventListener('click', () => {


        if (window.confirm("Do you really want to delete this task ?")){
            removeTaskDOM(taskContent);
            control.removeSelectedTask(task);

        }


    })

    button.appendChild(span);
    div.appendChild(button);

    return div
}


const createDownDiv = function(task){
    const downDiv = document.createElement('div');
    downDiv.setAttribute('class', 'flex-display flex-basis20px task-down-div')

    downDiv.appendChild(createTimeLeftSection(task));
    downDiv.appendChild(createOriginSection(task))


    return downDiv
}


const createTimeLeftSection = function(task){
    const div = document.createElement('div');

    const p = document.createElement('p');
    p.setAttribute('class', 'fs-09rem time-left')
    
    let result = task.getTimeLeft().split('');
    result[0] = result[0].toUpperCase();
    result = result.join('');

    p.textContent = result
    

    div.appendChild(p)

    return div
}


const createOriginSection = function(task){
    const div = document.createElement('div')

    const p = document.createElement('p');
    p.setAttribute('class', 'fs-09rem')

    p.textContent = task.origin;


    div.appendChild(p)
    
    return div
}


const displayTasks = function(tasksList){

    const taskContainer = document.querySelector('#taskContainer');

    if(tasksList.length > 0){

        const taskListContainer = document.createElement('ul');
        taskListContainer.setAttribute('id', 'taskListContainer')
        taskListContainer.setAttribute('class', 'taskList-container')
        
        for(let x=0; x < tasksList.length; x++){

            const actualTask = tasksList[x];
            
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
    p1.textContent = 'No task ?';
    p1.setAttribute('class', 'fs14 bold-text text-color-ascent')
    
    const p2 = document.createElement('p');
    p2.textContent = 'You can create a new one !';

    const p3 = document.createElement('p');
    p3.textContent = "Or maybe it's a sign to relax, take your time";


    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    return div
}


const createCompletedTaskTemplate = function(){
    const div = document.createElement('div');

    div.appendChild(createPictureProfileSection());
    div.replaceChild(createTextSection())

    return div
}


const createPictureProfileSection = function(){
    const div = document.createElement('div');


    return div
}


const createTextSection = function(){
    const div = document.createElement('div');

    div.appendChild(createExpSection());
    div.appendChild(createInfoSection());


    return div
}


const createExpSection = function(){
    const div = document.createElement('div');


    return div
}


const createInfoSection = function(){
    const div = document.createElement('div');

    div.appendChild(createCompletedDateSection());
    div.appendChild(createProjectSection());
    return div
}


const createCompletedDateSection = function(){
    const div = document.createElement('div');


    return div
}


const createProjectSection = function(){
    const div = document.createElement('div');


    return div
}


export {createContentTemplate, displayTasks}