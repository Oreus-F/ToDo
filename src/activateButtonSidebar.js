import { createDialogProjectName, activateFormNewProject, createDialogEditUser, activateEditUser} from "./dialogCreationDOM";
import { createAddTaskPanel } from "./addTask";
import { displayToday } from "./todayButton";
import { displayInbox } from "./inbox";
import { displayUpcomming } from "./upcomming";
import { displayCompleted } from "./completed";
import { displayProject } from "./projects";
import { ProjectManager } from "./projectManager";
import { updateSidebarProjectList } from "./updateDOMProjectSidebar";


const control = ProjectManager()



const switchDataAttribute = function(target, content){
    let data = target.getAttribute(`data-${content}`);
    data = data === 'true' ? false : true;
    target.setAttribute(`data-${content}`, data)
}


const changeActiveAttribute = function(){
    const content = document.querySelector('#content');
    const displayed = content.getAttribute('data-displayed');

    const menu = document.querySelector('#menu');
    const buttons = menu.querySelectorAll('button');

    buttons.forEach(button => {
        const target = button.getAttribute('data-target');
        const active = button.getAttribute('data-active');

        if(displayed === 'projects'){
            if (active == 'true') switchDataAttribute(button, 'active');

            const title = content.firstChild.firstChild.firstChild.firstChild.firstChild.textContent
            if (target === title) switchDataAttribute(button, 'active');
 
        } else {
            
            if (active == 'true') switchDataAttribute(button, 'active');
            if (target === displayed) switchDataAttribute(button, 'active');
        }

    })
}


const setUpAddProjectButton = function(){
    const addProjectButton = document.querySelector('#addProjectButton');

    addProjectButton.addEventListener('click', () => {
        createDialogProjectName();
        activateFormNewProject();
    })
};


const setUpEditUserButton = function(){
    const editUserButton  = document.querySelector('#editUserButton');

    editUserButton.addEventListener('click', () => {
        createDialogEditUser();
        activateEditUser();
        activateButtonResetLocalStorage();
    })
}


const activateButtonResetLocalStorage = function(){
    const resetData = document.querySelector('#reset-personnal-data');


    resetData.addEventListener('click', () => {
        if(window.confirm('Warning : You will reset your actual username, profile picture and delete all of you projects and tasks. Do you want to continue ?')){
            localStorage.clear();
            window.location.reload();
        }
    })
}


const setUpDisplaySidebar = function(){
    const displaySidebarButton = document.querySelector('#displaySidebarButton');

    displaySidebarButton.addEventListener('click', (event) => {
        let target = event.target;
        target = target.parentElement;

        switchDataAttribute(target, 'sidebar')
    });
}


const setUpDisplayProjects = function(){
    const displayProjectsButton = document.querySelector('#displayProjectsButton');
    
    displayProjectsButton.addEventListener('click', () => {
        const projectContainer = document.querySelector('#projects-container');
        const chevronIcon = document.querySelector('#chevron-icon');

        switchDataAttribute(projectContainer, 'projects');
        switchDataAttribute(chevronIcon, 'projects');
    })
}


const setUpAddTaskButton = function(){
    const button = document.querySelector('#newTaskOpenModal');

    button.addEventListener('click', (event) => {
        const inline = event.currentTarget.getAttribute('data-inline')
        const body = document.querySelector('body');
        
        const checkPanel = body.lastElementChild
        const isDisplayed = checkPanel.getAttribute('data-taskPanel');

        isDisplayed === 'true' ? body.removeChild(checkPanel) : body.appendChild(createAddTaskPanel(inline));

    })
}


const setUpTodayButton = function(){
    const todayButton = document.querySelector('#today_button');

    todayButton.addEventListener('click', () => {
        displayToday();
        changeActiveAttribute();
    })
}


const setUpInboxButton = function(){
    const inboxButton = document.querySelector('#inbox_button');

    inboxButton.addEventListener('click', () => {
        displayInbox();
        changeActiveAttribute();
    })
}


const setUpUpcommingButton = function(){
    const upcommingButton = document.querySelector('#upcomming_button');

    upcommingButton.addEventListener('click', () => {
        displayUpcomming();
        changeActiveAttribute();
    })
}


const setUpCompletedButton = function(){
    const completedButton = document.querySelector('#completed_button');

    completedButton.addEventListener('click', () => {
        displayCompleted();
        changeActiveAttribute();
    })
}


const updateProjectButton = function(){
    const sidebarList = document.querySelector('#sidebarProjectList');
    const buttons = sidebarList.querySelectorAll('button.menu-button');

    for(let x= 0; x<buttons.length;x++){
        const button = buttons[x];
        button.setAttribute('data-event-click', 'true');
        const projectName = button.lastChild.previousSibling.lastChild.textContent;

        const deleteButton = button.lastChild.lastChild;

        button.addEventListener('click', (event)=> {
            if(event.target !== deleteButton){
                displayProject(projectName);
                changeActiveAttribute();
            }

        })


        deleteButton.addEventListener('click', ()=> {

            if(window.confirm(`Do you want to delete "${projectName}" project ?`)){
                control.removeProject(project);
                const projectList = control.getProjectList()
                updateSidebarProjectList(projectList)
                displayToday();
                
            }
        })
    } 
    

    const addButtonListener = function(records){
        for (const record of records){
            for (const addedNode of record.addedNodes){
                const button = addedNode.lastChild;
                const dataButton = button.getAttribute('data-event-click');
                const projectName = button.lastChild.previousSibling.lastChild.textContent;
                const deleteButton = button.lastChild.lastChild;
                const project = control.getProject(projectName);

                if(dataButton !== 'true'){
                    button.addEventListener('click', (event)=> {
                        if(event.currentTarget === event.target){
                            displayProject(projectName);
                            changeActiveAttribute();
                        }
                    })


                    deleteButton.addEventListener('click', ()=> {
                        
                        if(window.confirm(`Do you want to delete ${projectName} project ?`)){
                            control.removeProject(project);
                            const projectList = control.getProjectList();
                            updateSidebarProjectList(projectList);
                            displayToday();
                        }
                    })

                }
            }
        }
    }

    const observerOptions = {
        childList: true,
        subtree: true
    }

    const observer = new MutationObserver(addButtonListener);
    observer.observe(sidebarList, observerOptions)


 


}


const activateSidebarButtons = function(){
    setUpAddProjectButton();
    setUpEditUserButton();
    setUpDisplaySidebar();
    setUpDisplayProjects();
    setUpAddTaskButton();
    setUpTodayButton();
    setUpInboxButton();
    setUpUpcommingButton();
    setUpCompletedButton();
    updateProjectButton();
}


export {activateSidebarButtons}