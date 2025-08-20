import { createContentTemplate, taskTemplate } from "./contentTemplate";
import { ProjectManager } from "./projectManager";

const control = ProjectManager()

const displayToday = function(){
    const content = document.querySelector('#content');

    content.appendChild(createContentTemplate('Today', '05/09/2025', 'x tasks for today'));


    createAddTask();
        
    // DOIS CHERCHER LES TACHES DU JOURS PAS TOUTES LES TASKS SA MERE

    
    displayTasksToday()

}


const createAddTask = function(){
    console.log('creéer un bouton pour ajouter une nouvelle tasks')
}


const displayTasksToday = function(){
    const taskContainer = document.querySelector('#taskContainer');
    // const TODAY = Date();

    const tasksList = control.getAllTasks();



    for(let x=0; x < tasksList.length; x++){

        
        taskContainer.appendChild(taskTemplate(tasksList[x]))
    }

}



export {displayToday}