import { createContentTemplate, taskTemplate } from "./contentTemplate";
import { ProjectManager } from "./projectManager";

const control = ProjectManager()

const displayToday = function(){
    const content = document.querySelector('#content');

    content.appendChild(createContentTemplate('Today', '05/09/2025', 'x tasks for today'));


    createAddTask();
    
    
    // DOIS CHERCHER LES TACHES DU JOURS PAS TOUTES LES TASKS SA MERE
    const taskOfToday = control.getAllTasks();
    
    if(taskOfToday.length > 0){displayTasksToday(taskOfToday)}

}


const createAddTask = function(){
    console.log('creéer un bouton pour ajouter une nouvelle tasks')
}


const displayTasksToday = function(tasks){
    const taskContainer = document.querySelector('#taskContainer');
    const TODAY = Date();

    for(let x=0; x < tasks.length; x++){

        

        taskContainer.appendChild(taskTemplate(tasks[x]))
    }

}



export {displayToday}