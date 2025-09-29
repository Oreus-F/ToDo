import { addDays, compareAsc, format, isBefore, isToday, isTomorrow } from "date-fns";
import { createCalendarArray, getCalendarDays, getOneMonthAfter, getOneMonthBefore, getThisMonth } from "./bookingCalendar";
import { ProjectManager } from "./projectManager";
import { displayToday } from "./todayButton";


const control = ProjectManager();

const createAddTaskPanel = function(inline, task){

    const div = document.createElement('div');
    div.setAttribute('id', 'newTaskModal');
    div.setAttribute('data-inline', inline);
    
    inline === 'true' ? div.setAttribute('class', 'inline-modal flex-display column-direction') : div.setAttribute('class', 'modal modal-newTask flex-display column-direction');
    
    const form = document.createElement('form');
    form.setAttribute('id', 'task_form')
    form.setAttribute('class', 'full-h');


    const mainContainer = document.createElement('div');

    mainContainer.setAttribute('class', 'main-container-style');
    

    mainContainer.appendChild(task_DivTitle(task));
    mainContainer.appendChild(task_Description(task));
    mainContainer.appendChild(task_Extra(task));


    const secondContainer = document.createElement('div');
    secondContainer.setAttribute('class', 'second-container-style');


    secondContainer.appendChild(task_choose_project(task));
    secondContainer.appendChild(task_buttons(div))

    form.appendChild(mainContainer);
    form.appendChild(secondContainer);

    div.appendChild(form);

    activateNewTask(form)
    
    return div
}


const task_DivTitle = function(task){
    const div = document.createElement('div');

    const input = document.createElement('input');
    input.setAttribute('name', 'task_title');
    input.setAttribute('id', 'task_title');
    input.setAttribute('required', 'true');
    
    input.setAttribute('class', 'newTask-titleInput');

    if(task){
        input.textContent = task.title;
    } else {
        input.setAttribute('placeholder', 'Deliver food to grandma');
    }



    div.appendChild(input);
    return div
}


const task_Description = function(task){
    const div = document.createElement('div');

    const textarea = document.createElement('textarea');
    textarea.setAttribute('maxlength', '500')
    textarea.setAttribute('class', 'newTask-description full-w');
    textarea.setAttribute('name', 'task_description');
    textarea.setAttribute('id', 'task_description');
    

    if(task){
        textarea.textContent = task.title;
    } else {
        textarea.setAttribute('placeholder', 'Description');
    }

    div.appendChild(textarea);

    return div
}


const task_Extra = function(task){
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display gap-16 taskExtra-border');

    div.appendChild(extraTask_Date(task));
    div.appendChild(extraTask_Priority(task))


    return div
}


const extraTask_Date = function(){

    const div = document.createElement('div');
    div.setAttribute('id', 'dateContainer');

    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('class', 'hidden');
    hiddenInput.setAttribute('id', 'task_date');
    hiddenInput.setAttribute('name', 'task_date');
    
    
    const button = document.createElement('button');
    button.setAttribute('id', 'task_date_button')
    button.setAttribute('class', 'extraTask-button flex-display pos-rel');
    button.setAttribute('type', 'button');

    const buttonContent = document.createElement('div');
    buttonContent.setAttribute('class', 'flex-first-grow flex-display justif-content-center aligned-item-center gap-8');

    const buttonIcon = document.createElement('span');
    buttonIcon.setAttribute('class', 'extraIcon calendar-date full-h flex-basis20px')

    
    const buttonText = document.createElement('p');
    buttonText.setAttribute('id', 'task_dateTexte')
    buttonText.setAttribute('class', 'flex-first-grow extraTask-text');

    const value = button.value

    if (value) {
        formatDateDisplayed(value, buttonText)
    } else {
        buttonText.textContent = 'Date'
    }

    
    button.addEventListener('click', () => {
        const value = button.value;
        togglePanel('date', PANELS, value);
    })

    buttonContent.appendChild(buttonIcon);
    buttonContent.appendChild(buttonText);
    buttonContent.appendChild(hiddenInput)
    button.appendChild(buttonContent);
    div.appendChild(button);
    

    return div
}


const extraTask_Priority = function(task){
    const div = document.createElement('div');
    div.setAttribute('id', 'priorityContainer');

    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('class', 'hidden');
    hiddenInput.setAttribute('id', 'task_priority');
    hiddenInput.setAttribute('name', 'task_priority');

    const button = document.createElement('button');
    button.setAttribute('id', 'task_priority_button')
    button.setAttribute('class', 'extraTask-button flex-display');
    button.setAttribute('type', 'button');

    const buttonContent = document.createElement('div');
    buttonContent.setAttribute('class', 'flex-first-grow flex-display justif-content-center aligned-item-center gap-8');

    const buttonIcon = document.createElement('span');
    buttonIcon.setAttribute('class', 'extraIcon priority-icon full-h flex-basis20px')

    const buttonText = document.createElement('p');
    buttonText.setAttribute('id', 'priority_text_button');
    buttonText.setAttribute('class', 'flex-first-grow extraTask-text');


    if (task) {
        button.value = task.priority;
        buttonText.textContent = task.priority;
    } else {
        buttonText.textContent = 'Priority'
    }

    button.addEventListener('click', () => {
        const value = button.value;
        togglePanel('priority', PANELS, value);
    })

    buttonContent.appendChild(buttonIcon);
    buttonContent.appendChild(buttonText);
    buttonContent.appendChild(hiddenInput)
    button.appendChild(buttonContent);
    div.appendChild(button)
    

    return div
}


const newDate_Panel = function(value){
    const div = document.createElement('div');
    div.setAttribute('class', 'extra-modal');
    div.setAttribute('id', 'date-panel');


    const container = document.createElement('div');
    container.setAttribute('id', 'bookingContainer');

    if(value){
        const dueDate = value;
        const calendarMonth = getCalendarDays(dueDate);
        const bookingCalendar = createCalendarArray(calendarMonth);

        container.appendChild(newDate_BookingCalendar(bookingCalendar));

    } else {
        const calendarMonth = getCalendarDays();
        const bookingCalendar = createCalendarArray(calendarMonth);


        container.appendChild(newDate_BookingCalendar(bookingCalendar));
        
    }
 

    div.appendChild(container);

    return div
}


const newDate_BookingCalendar = function(calendarDays){

    const month = getThisMonth(calendarDays);
    
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction gap-16')


    const firstDiv = document.createElement('div');
    firstDiv.setAttribute('class', 'first-div-style');

    const secondDiv = document.createElement('div');


    firstDiv.appendChild(bookingCalendar_titleMonth(month));
    firstDiv.appendChild(bookingCalendar_switchMonthsButtons(calendarDays, month));
    secondDiv.appendChild(bookingCalendar_buttonsGrid(calendarDays, month));

    div.appendChild(firstDiv);
    div.appendChild(secondDiv)

    return div
}


const bookingCalendar_titleMonth = function(month){
    const monthTitle = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.setAttribute('class', 'title-month');
    month = month.toUpperCase();
    h3.textContent = month;

    monthTitle.appendChild(h3);

    return monthTitle
}


const bookingCalendar_switchMonthsButtons = function(calendarDays){
    const switchMonthContainer = document.createElement('div');
    switchMonthContainer.setAttribute('class', 'arrow-container')
    
    const buttonGetMonthBefore = document.createElement('button');

    buttonGetMonthBefore.setAttribute('type', 'button');
    buttonGetMonthBefore.setAttribute('id', 'previousMonth');
    buttonGetMonthBefore.setAttribute('class', 'arrow-button arrow-monthBefore');


    disableMonthBefore(calendarDays, buttonGetMonthBefore)

    
    buttonGetMonthBefore.addEventListener("click", (event) => {
        removeCalendarPanel();
        const newCalendar = getOneMonthBefore(calendarDays);

        const container = document.querySelector('#bookingContainer');
        container.appendChild(newDate_BookingCalendar(newCalendar));
        disableMonthBefore(newCalendar, buttonGetMonthBefore)

    });

    const buttonGetMonthAfter = document.createElement('button');

    buttonGetMonthAfter.setAttribute('type', 'button')
    buttonGetMonthAfter.setAttribute('class', 'arrow-button arrow-monthAfter');

    buttonGetMonthAfter.addEventListener('click', ()=> {
        removeCalendarPanel();
        const newCalendar = getOneMonthAfter(calendarDays);

        const container = document.querySelector('#bookingContainer');
        container.appendChild(newDate_BookingCalendar(newCalendar));
        disableMonthBefore(newCalendar, buttonGetMonthBefore)
    })

    switchMonthContainer.appendChild(buttonGetMonthBefore);
    switchMonthContainer.appendChild(buttonGetMonthAfter);


    return switchMonthContainer
}


const disableMonthBefore = function(newCalendar, button){
    const TODAY = new Date;
    const TodaysMonth = getThisMonth(TODAY);

    const monthDisplayed = getThisMonth(newCalendar);

    TodaysMonth === monthDisplayed ? button.setAttribute('disabled', "true") : button.removeAttribute("disabled");  

}


const bookingCalendar_buttonsGrid = function(calendarDays, month){

    const gridContainer = document.createElement('div');
    gridContainer.setAttribute('class', 'bookingCalendar-grid');

    const TODAY = new Date;
    
    calendarDays.forEach(row => {

        row.forEach(date => {

            const button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.setAttribute('class', 'bookingButtons');
            button.textContent = date.getDate();

            const isBeforeToday = isBefore(date, TODAY);
            const dateOfToday = isToday(date)
            const thisMonth = getThisMonth(date);

            if(dateOfToday){button.setAttribute('data-today', 'true')}

            if (thisMonth !== month){
                button.setAttribute('disabled', 'true')
            } else if (isBeforeToday && !dateOfToday){
                button.setAttribute('disabled', 'true');
            } 

            gridContainer.appendChild(button);

            button.addEventListener('click', () => {
                const buttonDate = document.querySelector('#task_date_button');
                buttonDate.setAttribute('value', date);

                const inputDate = document.querySelector('#task_date');
                const formatedDateForTask = format(date, 'dd/MM/yyyy')
                inputDate.setAttribute('value', formatedDateForTask);

                const buttonText = document.querySelector('#task_dateTexte');
                formatDateDisplayed(date, buttonText);

                const closingButton = document.querySelector('#closingButton-transparant');
                closingButton.click()
                
            })
        })
    });

    return gridContainer
}


const removeCalendarPanel = function(){
    const container = document.querySelector('#bookingContainer');
    
    container.replaceChildren()
}


const formatDateDisplayed = function(date, container){
    let result;

    const TODAY = new Date;

    const dateOfToday = isToday(date);
    const dateOfTomorrow = isTomorrow(date);

    const lastDay = addDays(TODAY, 6);
    const compareDate = compareAsc(lastDay, date)

    if (dateOfToday){
        result = 'Today';
        container.setAttribute('data-week', 'today');
    } else if (dateOfTomorrow) {
        result = 'Tomorrow';
        container.setAttribute('data-week', 'tomorrow');
    } else if (compareDate === 1){
        result = format(date, 'cccc');
        container.setAttribute('data-week', 'week');
    } else {
        result = format(date, 'dd MMM');
        container.setAttribute('data-week', 'date');
    }

    container.textContent = result
}


const newPriority_panel = function(value){
    const div = document.createElement('div');
    div.setAttribute('class', 'extra-modal');
    div.setAttribute('id', 'priority-panel');

    const container = document.createElement('div')
    container.setAttribute('id', 'priorityList');

    container.appendChild(create_priority_list(value))    


    div.appendChild(container);

    return div
}


const newProject_panel = function(value){
    const div = document.createElement('div');
    div.setAttribute('class', 'extra-modal');
    div.setAttribute('id', 'project-panel');

    const container = document.createElement('div');
    container.setAttribute('id', 'projectContainer');

    container.appendChild(create_project_list(value))

    div.appendChild(container);

    return div
}


const create_project_list = function(value){
    const ul = document.createElement('ul');

    const projectList = control.getProjectList();

    for(let x=0; x < projectList.length; x++){
        ul.appendChild(create_project_element(projectList, x, value))        
    }

    return ul
}


const create_project_element = function(array, index, value){
    const result = array[index].title;

    const li = document.createElement('li');
    li.setAttribute('data-project', result);
    li.setAttribute('class', 'flex-display');

    if(value === result){li.setAttribute('data-selected', 'true')};
    
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'priority-projects-button');

    const spanIcon = document.createElement('span');
    
    if(result === 'Inbox'){
        spanIcon.setAttribute('class', 'icon-inbox priority-project-icons-panel extra-project-icons-panels');
    } else {
        spanIcon.setAttribute('class', 'icon-one-project priority-project-icons-panel extra-project-icons-panels');
    }

    const p = document.createElement('p'); 
    
    let text = result.split('');
    text[0] = text[0].toUpperCase();
    text = text.join("");

    p.textContent = text;
    p.setAttribute('class', 'priority-project-text');


    const spanSelection = document.createElement('span');
    spanSelection.setAttribute('class', 'priority-project-icons-panel');

    if(value === result){spanSelection.setAttribute('data-selected', 'true')};

    button.addEventListener('click', ()=> {
        
        const projectInput = document.querySelector('#task_project');
        projectInput.setAttribute('value', result);

        const projectButton = document.querySelector('#task_project_button');
        projectButton.setAttribute('data-priority', result);


        if(result !== 'Inbox'){
            const buttonIcon = document.querySelector('#project_icon_button');
            buttonIcon.setAttribute('class', 'icon-task-project task-project-icons-button');
        } else {
            const buttonIcon = document.querySelector('#project_icon_button');
            buttonIcon.setAttribute('class', 'icon-task-inbox task-project-icons-button');
        }


        const buttonText = document.querySelector('#project_text_button');
        buttonText.textContent = text;
        
        const closingButton = document.querySelector('#closingButton-transparant');
        closingButton.click();
    })

    button.appendChild(spanIcon);
    button.appendChild(p);
    button.appendChild(spanSelection);

    li.appendChild(button)
    
    return li
}


const create_priority_list = function(value){
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'flex-display column-direction')
    
    const priorityChoices = ['high', 'medium', 'low', 'none'];

    for(let x=0; x < priorityChoices.length; x++){
        ul.appendChild(create_priority_element(priorityChoices, x, value))        
    }


    return ul
}


const create_priority_element = function(array, index, value){
    const result = array[index];

    const li = document.createElement('li');
    li.setAttribute('data-priority', result);
    li.setAttribute('class', 'flex-display');
    
    if(value === result){li.setAttribute('data-selected', 'true')};

    
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'priority-projects-button');

    
    const spanFlag = document.createElement('span');
    spanFlag.setAttribute('class', 'priority-icon priority-project-icons-panel');

    const p = document.createElement('p'); 
    
    let text = result.split('');
    text[0] = text[0].toUpperCase();
    text = text.join("");

    p.textContent = text;
    p.setAttribute('class', 'priority-project-text');





    const spanSelection = document.createElement('span');
    spanSelection.setAttribute('class', 'priority-project-icons-panel');

    if(value === result){spanSelection.setAttribute('data-selected', 'true')};

    button.addEventListener('click', ()=> {
        const priorityInput = document.querySelector('#task_priority');
        priorityInput.setAttribute('value', result);

        const priorityButton = document.querySelector('#task_priority_button')
        priorityButton.setAttribute('data-priority', result);

        const buttonText = document.querySelector('#priority_text_button');
        buttonText.textContent = text;
        
        const closingButton = document.querySelector('#closingButton-transparant');
        closingButton.click()
    })

    button.appendChild(spanFlag);
    button.appendChild(p);
    button.appendChild(spanSelection);

    li.appendChild(button)
    
    return li
}


const task_choose_project = function(task){

    const div = document.createElement('div');
    div.setAttribute('id', 'projectContainer');

    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('class', 'hidden');
    hiddenInput.setAttribute('id', 'task_project');
    hiddenInput.setAttribute('name', 'task_project');

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'task_project_button');
    button.setAttribute('class', 'flex-display aligned-item-center task-project-button');

    const spanIcon = document.createElement('span');
    spanIcon.setAttribute('class', 'icon-task-project task-project-icons-button');
    spanIcon.setAttribute('id', 'project_icon_button')

    const p = document.createElement('p');
    p.setAttribute('class', 'flex-first-grow');
    p.setAttribute('id', 'project_text_button');
    
    if(task){
        const value = task.origin;
        p.textContent = value;
        hiddenInput.setAttribute('value', value)
    } else {
        const value = 'Inbox';
        p.textContent = value;
        hiddenInput.setAttribute('value', value)
    }


    if(hiddenInput.value === 'Inbox'){
        spanIcon.classList.toggle('icon-task-project')
        spanIcon.classList.toggle('icon-task-inbox')
    }

    const spanToggle = document.createElement('span');
    spanToggle.setAttribute('class', 'icon-task-chevron task-project-icons-button');

    button.addEventListener('click', ()=> {
        const value = button.getAttribute('value');
        togglePanel('projects', PANELS, value)
    })

    button.appendChild(spanIcon);
    button.appendChild(p);
    button.appendChild(spanToggle);
    button.appendChild(hiddenInput)

    div.appendChild(button)

    return div
}


const task_buttons = function(target){
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display gap-8 aligned-item-center')

    const closingButton = document.createElement('button');
    closingButton.setAttribute('type', 'button');
    closingButton.setAttribute('class', 'taskPanel-lastButton cancel-button');
    closingButton.setAttribute('id', 'closing_task_panel')
    closingButton.textContent = 'Cancel';

    closingButton.addEventListener('click', () => {
        const inline = target.getAttribute('data-inline');
        const parent = target.parentElement;

        if (inline == 'true'){checkInlineButton(target)}
        parent.removeChild(target)

    });

    const validateButton = document.createElement('button');
    validateButton.textContent = 'Create task';
    validateButton.setAttribute('class', 'taskPanel-lastButton validate-button');


    div.appendChild(closingButton)
    div.appendChild(validateButton)

    return div
}


const createClosingButton = function(parent, container, target){

    const button = document.createElement('button');
    button.setAttribute('class', 'closingOut');
    button.setAttribute('id', 'closingButton-transparant');


    const parentPosition = parent.getBoundingClientRect()
    const parentLeft = parentPosition.left;
    const parentTop = parentPosition.top;
    button.setAttribute('style', `transform: translate(-${parentLeft}px, -${parentTop}px)`);


    button.addEventListener('click', () => {
        container.removeChild(target);
        parent.removeChild(button)
    });


    parent.appendChild(button);
}


const positionPanel = function(panel, targetOne, targetTwo){
    const T1Position = targetOne.getBoundingClientRect()
    const T1Left = T1Position.left;
    const T1Top = T1Position.top;

    const T2Position = targetTwo.getBoundingClientRect();
    const T2Right = T2Position.right;
    const T2Top = T2Position.top;

    const panelLeftPosition = T2Right - T1Left;
    const panelTopPosition = T2Top - T1Top;

    panel.setAttribute('style', `transform: translate(${panelLeftPosition}px, ${panelTopPosition}px)`)
}


const togglePanel = function(data, panelsInfos, buttonValue){
    let wantedPanel;

    for(const [key, value] of Object.entries(panelsInfos)){
        if (key === data){
            wantedPanel = value;
        }
    };


    const container = document.querySelector(`#${wantedPanel.container}`);
    const panel = document.querySelector(`#${wantedPanel.panel}`);
    const panelFunction = wantedPanel.function;

    if (panel === null){
        container.appendChild(panelFunction(buttonValue));

        const activeContainer = document.querySelector(`#${wantedPanel.container}`)
        const activePanel = document.querySelector(`#${wantedPanel.panel}`);
        const parent = document.querySelector(`#${wantedPanel.parent}`);

        positionPanel(activePanel, parent, container);
        createClosingButton(parent, activeContainer, activePanel);

    } else { 
        container.removeChild(panel)
    }
}


const activateNewTask = function(form){
    form.addEventListener('submit', sendNewTask)
}


const sendNewTask = function(event){
    event.preventDefault();

    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData.entries());

    const project = formData.task_project;

    control.changeProject(project);

    const title = formData.task_title;
    const priority = formData.task_priority;
    const date = formData.task_date;
    const description = formData.task_description;

    control.createTask(title, priority, date, description)

    const closingButton = document.querySelector('#closing_task_panel');
    closingButton.click();

    
    updateTasksDisplayed()
}


const updateTasksDisplayed = function(){

    const targets = {
        'today' : displayToday,
        'upcomming' : 'put tomorrow function',
        'project' : 'put project function'

    };


    const content = document.querySelector('#content');
    const dataContent = content.getAttribute('data-displayed');


    let resultFunction;

    for (const key in targets){
        if(key == dataContent) resultFunction = targets[key];
    }

    content.replaceChildren();

    resultFunction();
}


const createInlineAddTask = function(){
    const div = document.createElement('div');
    div.setAttribute('class', 'full-w')

    const button = document.createElement('button');
    button.setAttribute('class', 'add-task-inline-button')
    button.setAttribute('data-inline', true);
    button.setAttribute('data-hidden', false);

    const spanIcon = document.createElement('span');
    spanIcon.setAttribute('class', 'icon-inline-add-task')
    

    const p = document.createElement('p');
    p.textContent = 'Create a task';

    button.addEventListener('click', (event) => {
        const inline = event.currentTarget.getAttribute('data-inline');
        div.appendChild(createAddTaskPanel(inline));

        button.setAttribute('data-hidden', true);

    })


    button.appendChild(spanIcon);
    button.appendChild(p);

    div.appendChild(button)

    return div
}



const checkInlineButton = function(panel){
    const buttonHidden = panel.previousElementSibling;
    buttonHidden.setAttribute('data-hidden', 'false')
}



const PANELS = {
    'date' : {
        'container': 'dateContainer',
        'panel': 'date-panel',
        'parent': 'newTaskModal',
        'function': newDate_Panel
    },
    'priority' : {
        'container': 'priorityContainer',
        'panel': 'priority-panel',
        'parent': 'newTaskModal',
        'function': newPriority_panel
    },
    'projects' : {
        'container': 'projectContainer',
        'panel': 'project-panel',
        'parent': 'newTaskModal',
        'function': newProject_panel
    }
}


export {createInlineAddTask, createAddTaskPanel, updateTasksDisplayed}