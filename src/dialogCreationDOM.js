import { addDays, compareAsc, format, isBefore, isToday, isTomorrow } from "date-fns";
import { createCalendarArray, getCalendarDays, getOneMonthAfter, getOneMonthBefore, getThisMonth } from "./bookingCalendar";
import { ProjectManager } from "./projectManager";

const control = ProjectManager();



const createDialogProjectName = function(){
    const dialog = document.createElement('dialog');
    dialog.setAttribute("id", "getProjectName");
    dialog.setAttribute("class", "dialog")

    const form = document.createElement('form');
    form.setAttribute('class', 'full-h');
    form.setAttribute('id', 'newProject');

    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction gap-16 full-h');

    const label = document.createElement('label');
    label.setAttribute('class', 'fs14');
    label.setAttribute('for', 'name');
    label.textContent = 'New project name :';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('required', 'true');
    input.setAttribute('id', 'name');
    input.setAttribute('name', 'name');
    input.setAttribute('placeholder', 'Project 404');
    input.setAttribute('class', 'flex-first-grow fs11 input-look input-project-name');

    const button = document.createElement('button');

    button.setAttribute('class', 'button-project-name');
    button.textContent = 'Create';


    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(button);

    form.appendChild(div);

    dialog.appendChild(form);

    const body = document.querySelector('body');
    body.appendChild(dialog);

    dialog.showModal();
}


const createDialogEditUser = function(){
    const dialog = document.createElement('dialog');
    dialog.setAttribute("id", "editUserDialog");
    dialog.setAttribute('class', "dialog dialog-edit-user")

    const form = document.createElement('form');
    form.setAttribute('class', 'full-h');
    form.setAttribute('id', 'editUserForm');

    const container = document.createElement('div');
    container.setAttribute('class', 'full-h flex-display column-direction full-w gap-8');

    container.appendChild(createEditUser_DivPicture());
    container.appendChild(createEditUser_DivUsername());
    container.appendChild(createEditUser_DivResetStorage());


    const div = document.createElement('div');
    div.setAttribute('class', 'flex-basis80px flex-display justif-content-end');

    const button = document.createElement('button');
    button.setAttribute('class', 'button-edit-account');
    button.textContent = 'Edit Account';

    div.appendChild(button)
    container.appendChild(div);
    form.appendChild(container);
    dialog.appendChild(form)


    const body = document.querySelector('body');
    body.appendChild(dialog);

    dialog.showModal();
}


const createEditUser_DivPicture = function(){

    //container
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction pad1rem');

    //title
    const div_title = document.createElement('div');
    div_title.setAttribute('class', 'flex-basis40px flex-display aligned-item-center');

    const div_h2 = document.createElement('h2');
    div_h2.setAttribute('class', 'edit-user-title-container');
    div_h2.textContent = 'Profile picture';


    div_title.appendChild(div_h2);
    div.appendChild(div_title);


    //content
    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'grid-display edit-user-grid flex-first-grow pad1rem gap-8');

    const div_picture = document.createElement('div');
    div_picture.setAttribute('class', 'grid-area-header flex-display aligned-item-center justif-content-center');

    const img_preview = document.createElement('img');
    const currentPreview = localStorage.getItem('profilePicture');
    img_preview.setAttribute('src', currentPreview);
    img_preview.setAttribute('class', 'user-profile edit-preview-radius border-picture');
    img_preview.setAttribute('alt', 'preview of profile picture');
    img_preview.setAttribute('id', 'userPreviewPicture');

    div_picture.appendChild(img_preview);
    div_content.appendChild(div_picture);

    const div_interaction = document.createElement('div');
    div_interaction.setAttribute('class', 'grid-area-interaction flex-display aligned-item-end');

    const div_span_interaction = document.createElement('span');
    div_span_interaction.setAttribute('class', 'flex-first-grow');

    const div_input_interaction = document.createElement('input');
    div_input_interaction.setAttribute('type', 'file');
    div_input_interaction.setAttribute('id', 'fileUploader');
    div_input_interaction.setAttribute('name', 'fileUser');

    // --------> Interactivity for preview


    div_input_interaction.addEventListener('change', () => {
        const file = fileUploader.files[0];
        const reader = new FileReader();


        if (file){
            readFileReader(file, reader, img_preview)
        }
    
})




    div_span_interaction.appendChild(div_input_interaction);
    div_interaction.appendChild(div_span_interaction);
    div_content.appendChild(div_interaction);


    const div_exp = document.createElement('div');
    div_exp.setAttribute('class', 'grid-area-explaination fs-09rem');
    
    const div_span_exp = document.createElement('span');
    div_span_exp.textContent = 'Change your profile picture';

    div_exp.appendChild(div_span_exp);
    div_content.appendChild(div_exp);

    div.appendChild(div_content);


    return div
}


const createEditUser_DivUsername = function(){

    //container
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction gap-8 pad1rem');

    //title
    const div_title = document.createElement('div');
    div_title.setAttribute('class', 'flex-basis40px flex-display aligned-item-center');

    const div_h2 = document.createElement('h2');
    div_h2.setAttribute('class', 'edit-user-title-container');
    div_h2.textContent = 'User informations';


    div_title.appendChild(div_h2);
    div.appendChild(div_title);


    //content
    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'grid-display edit-user-grid flex-first-grow pad1rem gap-8');

    const div_title_h3 = document.createElement('div');
    div_title_h3.setAttribute('class', 'grid-area-header');

    const h3 = document.createElement('h3');
    h3.setAttribute('class', 'edit-user-title-content');
    h3.textContent = 'Username';


    div_title_h3.appendChild(h3);
    div_content.appendChild(div_title_h3);

    const div_interaction = document.createElement('div');
    div_interaction.setAttribute('class', 'grid-area-interaction');

    const div_span_interaction = document.createElement('span');
    div_span_interaction.setAttribute('class', 'flex-first-grow');

    const div_input_interaction = document.createElement('input');
    const currentUsername = localStorage.getItem('username');
    div_input_interaction.setAttribute('type', 'text');
    div_input_interaction.setAttribute('id', 'username');
    div_input_interaction.setAttribute('name', 'newUsername');
    div_input_interaction.setAttribute('class', 'input-look');
    div_input_interaction.setAttribute('placeholder', currentUsername);

    div_span_interaction.appendChild(div_input_interaction);
    div_interaction.appendChild(div_span_interaction);
    div_content.appendChild(div_interaction);


    const div_exp = document.createElement('div');
    div_exp.setAttribute('class', 'grid-area-explaination fs-09rem');
    
    const div_span_exp = document.createElement('span');
    div_span_exp.textContent = 'You can change your username here';

    div_exp.appendChild(div_span_exp);
    div_content.appendChild(div_exp);

    div.appendChild(div_content);


    return div
}


const createEditUser_DivResetStorage = function(){

    //container
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-display column-direction gap-8 pad1rem');

    //title
    const div_title = document.createElement('div');
    div_title.setAttribute('class', 'flex-basis40px flex-display aligned-item-center');

    const div_h2 = document.createElement('h2');
    div_h2.setAttribute('class', 'edit-user-title-container');
    div_h2.textContent = 'Delete informations';


    div_title.appendChild(div_h2);
    div.appendChild(div_title);


    //content
    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'grid-display edit-user-grid flex-first-grow pad1rem gap-8');

    const div_title_h3 = document.createElement('div');
    div_title_h3.setAttribute('class', 'grid-area-header');

    const h3 = document.createElement('h3');
    h3.setAttribute('class', 'edit-user-title-content');
    h3.textContent = 'Reset data';


    div_title_h3.appendChild(h3);
    div_content.appendChild(div_title_h3);

    const div_interaction = document.createElement('div');
    div_interaction.setAttribute('class', 'grid-area-interaction');

    const div_span_interaction = document.createElement('span');
    div_span_interaction.setAttribute('class', 'flex-display gap-8');


    const button = document.createElement('button');
    button.setAttribute('class', 'button-reset-data flex-basis200px');
    button.setAttribute('id', 'reset-personnal-data');
    button.textContent = 'Personnal data';
    div_span_interaction.appendChild(button);


    div_interaction.appendChild(div_span_interaction);
    div_content.appendChild(div_interaction);


    const div_exp = document.createElement('div');
    div_exp.setAttribute('class', 'grid-area-explaination fs-09rem');
    
    const div_span_exp = document.createElement('span');
    div_span_exp.textContent = 'You can delete personnal informations / Projects and Tasks';

    div_exp.appendChild(div_span_exp);
    div_content.appendChild(div_exp);

    div.appendChild(div_content);


    return div
}


const createDialogNewTask = function(task){
    const body = document.querySelector('body');

    const div = document.createElement('div');
    div.setAttribute('id', 'newTaskModal');
    div.setAttribute('class', 'modal modal-newTask flex-display column-direction');


    const closing = document.createElement('div');
    closing.setAttribute('class', 'closing-div')
    const button = document.createElement('button');
    button.setAttribute('class', 'closing-button');
    button.textContent = 'X';

    button.addEventListener('click', () => {
        body.removeChild(div)
    });

    closing.appendChild(button);

    const form = document.createElement('form');
    form.setAttribute('class', 'full-h neg-margin60TOP');


    const mainContainer = document.createElement('div');
    mainContainer.setAttribute('class', 'flex-display column-direction gap-16 full-h padAddTaskContainer mainContainer-border')

    mainContainer.appendChild(task_DivTitle(task));
    mainContainer.appendChild(task_Description(task));
    mainContainer.appendChild(task_Extra(task));


    const secondContainer = document.createElement('div');
    secondContainer.setAttribute('class', 'flex-display padAddTaskContainer');


    secondContainer.appendChild(task_choose_project(task));

    form.appendChild(mainContainer);
    form.appendChild(secondContainer);

    div.appendChild(closing)
    div.appendChild(form);

    body.appendChild(div);
    
}


const task_DivTitle = function(task){
    const div = document.createElement('div');

    const input = document.createElement('input');
    input.setAttribute('class', 'newTask-titleInput')
    input.setAttribute('name', 'task_title');
    input.setAttribute('id', 'task_title');
    

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
    div.setAttribute('id', 'dateContainer')

    const button = document.createElement('button');
    button.setAttribute('id', 'task_date');
    button.setAttribute('name', 'task_date');
    button.setAttribute('class', 'extraTask-button flex-display pos-rel');
    button.setAttribute('type', 'button')

    const buttonContent = document.createElement('div');
    buttonContent.setAttribute('class', 'flex-first-grow flex-display justif-content-center aligned-item-center gap-8');

    const buttonIcon = document.createElement('span');
    buttonIcon.setAttribute('class', 'extraIcon calendar-date full-h flex-basis20px')

    const value = button.value;

    const buttonText = document.createElement('p');
    buttonText.setAttribute('id', 'task_dateTexte')
    buttonText.setAttribute('class', 'flex-first-grow extraTask-text');


    if (value) {
        formatDateDisplayed(value, buttonText)
    } else {
        buttonText.textContent = 'Date'
    }

    

    button.addEventListener('click', () => {
        const value = button.value;
        openBookingCalendar(value)
    })

    buttonContent.appendChild(buttonIcon);
    buttonContent.appendChild(buttonText);
    button.appendChild(buttonContent);
    div.appendChild(button);
    

    return div
}


const openBookingCalendar = function(value){
    const dateContainer = document.querySelector('#dateContainer');

    const datePanel = document.querySelector('#date-panel');

    datePanel === null ? dateContainer.appendChild(newDate_Panel(value)) : dateContainer.removeChild(datePanel)
}


const extraTask_Priority = function(task){
    const div = document.createElement('div');
    div.setAttribute('id', 'priorityContainer');

    const button = document.createElement('button');
    button.setAttribute('id', 'task_priority');
    button.setAttribute('name', 'task_priority');
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
        priority_togglePanel(value);
    })

    buttonContent.appendChild(buttonIcon);
    buttonContent.appendChild(buttonText);
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

    const dateContainer = document.querySelector('#dateContainer');
    const newTaskModal = document.querySelector('#newTaskModal');
    
    createClosingButton(div, dateContainer, newTaskModal)
    positionPanel(div, newTaskModal, dateContainer)
    


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
                const buttonDate = document.querySelector('#task_date');
                buttonDate.setAttribute('value', date);

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


const priority_togglePanel = function(value){
    const priorityContainer = document.querySelector('#priorityContainer');

    const priorityPanel = document.querySelector('#priority-panel');

    priorityPanel === null ? priorityContainer.appendChild(newPriority_panel(value)) : priorityContainer.removeChild(priorityPanel)
}


const newPriority_panel = function(value){
    const div = document.createElement('div');
    div.setAttribute('class', 'extra-modal');
    div.setAttribute('id', 'priority-panel');

    const container = document.createElement('div')
    container.setAttribute('id', 'priorityList');

    container.appendChild(create_priority_list(value))    

    const newTaskModal = document.querySelector('#newTaskModal');
    const priorityContainer = document.querySelector('#priorityContainer');

    createClosingButton(div, priorityContainer, newTaskModal)
    positionPanel(div, newTaskModal, priorityContainer)

    div.appendChild(container);

    return div
}


const newProject_panel = function(value){
    const div = document.createElement('div');
    div.setAttribute('class', 'extra-modal');
    div.setAttribute('id', 'project-panel');


    const container = document.createElement('div');
    container.setAttribute('id', 'projectContainer');

    if(value){


    } else {
        
    }
    

    const button = document.createElement('button');
    button.setAttribute('class', 'closingOut');
    button.setAttribute('id', 'closingButton-transparant');


    
    const newTaskModal = document.querySelector('#newTaskModal');
    const infoPanel = newTaskModal.getBoundingClientRect()
    const taskModalLeft = infoPanel.left;
    const taskModalTop = infoPanel.top;
    button.setAttribute('style', `transform: translate(-${taskModalLeft}px, -${taskModalTop}px)`);


    button.addEventListener('click', () => {
        const dateContainer = document.querySelector('#dateContainer');
        dateContainer.removeChild(div);
        newTaskModal.removeChild(button);
    });


    const dateContainer = document.querySelector('#dateContainer');
    const dateContainerPosition = dateContainer.getBoundingClientRect();
    const dateButtonRight = dateContainerPosition.right;
    const dateButtonTop = dateContainerPosition.top;


    const panelLeftPosition = dateButtonRight - taskModalLeft;
    const panelTopPosition = dateButtonTop - taskModalTop;

    div.setAttribute('style', `transform: translate(${panelLeftPosition}px, ${panelTopPosition}px)`)

    div.appendChild(container);
    newTaskModal.appendChild(button);

    return div
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
    button.setAttribute('class', 'priority-button');




    const spanFlag = document.createElement('span');
    spanFlag.setAttribute('class', 'priority-icon priority-icons-panel');

    const p = document.createElement('p'); 
    
    let text = result.split('');
    text[0] = text[0].toUpperCase();
    text = text.join("");

    p.textContent = text;
    p.setAttribute('class', 'priority-text');





    const spanSelection = document.createElement('span');
    spanSelection.setAttribute('class', 'priority-icons-panel');

    if(value === result){spanSelection.setAttribute('data-selected', 'true')};

    button.addEventListener('click', ()=> {
        const priorityButton = document.querySelector('#task_priority');
        priorityButton.setAttribute('value', result);
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

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'task_project');
    button.setAttribute('class', 'flex-display aligned-item-center task-project-button');

    const spanIcon = document.createElement('span');
    spanIcon.setAttribute('class', 'icon-task-project task-project-icons-button');

    const p = document.createElement('p');
    p.setAttribute('class', 'flex-first-grow')
    
    if(task){
        const value = task.origin;
        p.textContent = value;
        button.setAttribute('value', value)
    } else {
        const value = 'Inbox';
        p.textContent = value;
        button.setAttribute('value', value)
    }


    if(button.value === 'Inbox'){
        spanIcon.classList.toggle('icon-task-project')
        spanIcon.classList.toggle('icon-task-inbox')
    }

    const spanToggle = document.createElement('span');
    spanToggle.setAttribute('class', 'icon-task-chevron task-project-icons-button')

    button.appendChild(spanIcon);
    button.appendChild(p);
    button.appendChild(spanToggle);

    div.appendChild(button)

    return div
}


const sendNewUserData = function(event){
    const dialog = document.querySelector('#editUserDialog');
    const body = document.querySelector('body');

    event.preventDefault();

    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData.entries())

    const currentPreview = localStorage.getItem('profilePicture');
    const currentUsername = localStorage.getItem('username');


    if(formData.fileUser.size > 0) {
        const file = formData.fileUser;
        const reader = new FileReader();


        reader.addEventListener('load', () => {
            if(currentPreview !== reader.result){
                localStorage.setItem('profilePicture', reader.result)
            }
        });
    
        reader.readAsDataURL(file);

    };

    if(formData.newUsername && formData.newUsername.length > 0 && formData.newUsername !== currentUsername) {
        localStorage.setItem('username', formData.newUsername)
    };

    
    dialog.close();
    body.removeChild(dialog);
    window.location.reload();
}


const sendNewProject = function(event){
    const dialog = document.querySelector('#getProjectName');
    const body = document.querySelector('body');

    event.preventDefault();

    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData.entries())

    control.newProject(formData.name);  
    
    dialog.close();
    body.removeChild(dialog);
}


const activateEditUser = function(){
    const form = document.querySelector('#editUserForm');

    form.addEventListener('submit', sendNewUserData)
}


const activateFormNewProject = function(){
    const form = document.querySelector('#newProject');

    form.addEventListener('submit', sendNewProject)
}


const readFileReader = function(file, fileReader, target){
    fileReader.addEventListener('load', () => {
        target.setAttribute('src', fileReader.result);
    });
    
    fileReader.readAsDataURL(file);

    
}



const createClosingButton = function(target, container, parent){
    const button = document.createElement('button');
    button.setAttribute('class', 'closingOut');
    button.setAttribute('id', 'closingButton-transparant');


    const parentPosition = parent.getBoundingClientRect()
    const parentLeft = parentPosition.left;
    const parentTop = parentPosition.top;
    button.setAttribute('style', `transform: translate(-${parentLeft}px, -${parentTop}px)`);


    button.addEventListener('click', () => {
        container.removeChild(target);
        parent.removeChild(button);
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



export {createDialogProjectName, activateFormNewProject, createDialogEditUser, activateEditUser,


    newDate_Panel, createDialogNewTask
}