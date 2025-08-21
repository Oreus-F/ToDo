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
    const taskContent = document.createElement('div');

    // is this really necessary ? 
    taskContent.setAttribute('data-id', task.id);


    taskContent.appendChild(createUpDiv(task, taskContent));
    taskContent.appendChild(createDownDiv(task, taskContent));
    
    return taskContent
    
}


const createUpDiv = function(task, container){
    
    const upDiv = document.createElement('div');
    upDiv.setAttribute('class', 'flex-display')
    
    upDiv.appendChild(completeTaskButton(task, container));

    const divTitle = document.createElement('div');
    const titleText = document.createElement('p');

    titleText.textContent = task.title;

    divTitle.appendChild(titleText);
    upDiv.appendChild(divTitle)

    return upDiv
}


const createDownDiv = function(task){
    const downDiv = document.createElement('div');


    return downDiv
}


const removeTaskDOM = function(task){
    const taskContainer = document.querySelector('#taskContainer');

    taskContainer.removeChild(task)
}


const completeTaskButton = function(task, taskContent){
    const div = document.createElement('div');

    const button = document.createElement('button');

    // temporary text in oirder to see the button
    button.textContent = task.title;
    
    button.addEventListener('click', () => {
        control.completeSelectedTask(task);
        
        
        removeTaskDOM(taskContent);

    })

    div.appendChild(button)

    return div

}

export {createContentTemplate, taskTemplate}