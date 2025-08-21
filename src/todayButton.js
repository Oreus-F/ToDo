import { createContentTemplate, taskTemplate } from "./contentTemplate";
import { ProjectManager } from "./projectManager";
import { format } from "date-fns";

const control = ProjectManager()

const displayToday = function(){
    const content = document.querySelector('#content');

    
    const tasksList = control.getAllTasks();
    const todayList = tasksList.filter(task => task.getTimeLeft() === 'now');
    
    const TITLE_SECTION = "Today";
    const TODAY_DATE = format(new Date(), 'dd/MM/yyyy');
    const HEADER_DESCRIPTION = `${todayList.length} tasks for today !`

    content.appendChild(createContentTemplate(TITLE_SECTION, TODAY_DATE, HEADER_DESCRIPTION));


    createAddTask();
        
    // DOIS CHERCHER LES TACHES DU JOURS PAS TOUTES LES TASKS SA MERE

    
    displayTasksToday(todayList)

}


const createAddTask = function(){
    console.log('creéer un bouton pour ajouter une nouvelle tasks')
}


const displayTasksToday = function(todayList){

    const taskContainer = document.querySelector('#taskContainer');

    if(todayList.length > 0){
        
        for(let x=0; x < todayList.length; x++){

            const actualTask = todayList[x];
            
            taskContainer.appendChild(taskTemplate(actualTask))
        }
        
    } else {
        console.log('NO TASK FOR TODAY')
    }


}



export {displayToday}