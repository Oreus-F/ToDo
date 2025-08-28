import { ProjectManager } from "./projectManager";

const control = ProjectManager();


const createContentTemplate = function(title, date, text){
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

    taskContent.appendChild(createUpDiv(task, taskContent));
    taskContent.appendChild(createDownDiv(task, taskContent));
    
    taskListElement.appendChild(taskContent)

    return taskListElement
    
}


const createUpDiv = function(task, container){
    
    const upDiv = document.createElement('div');
    upDiv.setAttribute('class', 'flex-display flex-first-grow aligned-item-center gap-8')
    
    upDiv.appendChild(completeTaskButton(task, container));

    const divTitle = document.createElement('div');
    divTitle.setAttribute('class', 'flex-first-grow fs12rem')
    const titleText = document.createElement('p');

    titleText.textContent = task.title;

    divTitle.appendChild(titleText);
    upDiv.appendChild(divTitle);


    upDiv.appendChild(createTaskButtons(task));

    return upDiv
}


const removeTaskDOM = function(task){
    const taskContainer = document.querySelector('#taskContainer');

    taskContainer.removeChild(task)
}


const completeTaskButton = function(task, taskContent){
    const div = document.createElement('div');

    const button = document.createElement('button');
    button.setAttribute('class', 'completed-button');

    const priority = task.priority;
    button.setAttribute('data-priority', priority);
    
    button.addEventListener('click', () => {

        control.completeSelectedTask(task);
        
        removeTaskDOM(taskContent);

    })

    div.appendChild(button)

    return div

}



const createTaskButtons = function(task){
    const div = document.createElement('div');
    div.setAttribute('class', ' full-h flex-display gap-8 flex-basis80px justif-content-end hide-task-button')

    div.appendChild(createEditTaskButton(task));
    div.appendChild(createDeleteTaskButton(task));

    return div
}


const createEditTaskButton = function(task){
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display full-w')

    const button = document.createElement('button');
    button.setAttribute('class', 'flex-display justif-content-center full-w inside-task-button')

    const span = document.createElement('span');
    span.setAttribute('class', 'edit-task-icon task-icon-displayed flex-basis40px');


    button.appendChild(span);
    div.appendChild(button);

    return div
}


const createDeleteTaskButton = function(task){
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display full-w')

    const button = document.createElement('button');
    button.setAttribute('class', 'flex-display full-w justif-content-center inside-task-button')

    const span = document.createElement('span');
    span.setAttribute('class', 'delete-task-icon task-icon-displayed flex-basis40px');


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
    p.setAttribute('class', 'fs-09rem')
    p.textContent = task.getTimeLeft();

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


export {createContentTemplate, taskTemplate}