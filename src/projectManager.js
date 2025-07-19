import { TaskManager } from "./taskManager";
import { updateSidebarProjectList } from "./updateDOMProjectSidebar";

const taskControl = TaskManager();


class Project {

    constructor(title, tasks){
        this.title = title,
        this.tasks = Project.parsingTasks(tasks, this.title),
        this.complete = []
    }

    static parsingTasks(tasks, origin){
        
        const _tasks = [];
        
        if(tasks === undefined) {
            return _tasks
        } else {
            
            for(let x=0; x < tasks.length; x++){
                let newTask = tasks[x];
                newTask = taskControl.createTask(newTask.title, newTask._priority, newTask.formatedDueDate, newTask.description);

                newTask.changeOrigin(origin);

                _tasks.push(newTask)
            };

            return _tasks
        }



}
};


Project.prototype.getTasksList = function(){
    return this.tasks
}


Project.prototype.addTaskIntoProject = function(task){
    this.tasks.push(task)
    task.changeOrigin(this.title)
}


Project.prototype.getTask = function(x){
    return this.tasks[x]
}


Project.prototype.removeTask = function(task){
    this.tasks.splice(task, 1);
}


Project.prototype.completeTask = function(task){
    this.complete.push(task)
}


Project.prototype.getCompleteTasks = function(){
    return this.complete
}



const ProjectManager = function(){

    const defaultProject = new Project('default');
    
    const projectList = [defaultProject];
    
    let activeProject = defaultProject;
    


    const newProject = function(title, tasks){
        const project = new Project(title, tasks);
        projectList.push(project);
        changeProject(project);

        updateSidebarProjectList(getProjectList())
    };


    const getProjectList = function(){
        return projectList
    }


    const getProject = function(x){
        return projectList[x]
    };


    const getProjectIndex = function(project){
        return projectList.indexOf(project)
    }


    // Maybe not needed will see
    const getActiveProject = function(){
        return activeProject
    };


    const changeProject = function(x){
        let projectSelected;
        if(typeof(x) === 'number'){
            projectSelected = getProject(x);
        } else {
            let index = getProjectIndex(x)
            projectSelected = getProject(index);
        }
        activeProject = projectSelected;
    };



    // TEMPORARY METHOD


    const deleteALLPROJECT = function(){
        projectList.splice(0, getProjectList().length);
        updateSidebarProjectList(getProjectList());
    }


    const createTask = function(title, priority, date, description){
        const task = taskControl.createTask(title, priority, date, description);
        activeProject.addTaskIntoProject(task);
    }


    const getProjectTasksList = function(){
        return activeProject.getTasksList();
    }


    const getProjectSpecificTask = function(index){
        return activeProject.getTask(index)
    }


    const getTasksIndex = function(task){
        return activeProject.tasks.indexOf(task)
    }


    const removeSelectedTask = function(x){
        let taskSelected
        if(typeof(x) === 'number'){
            taskSelected = getProjectSpecificTask(x);
        } else {
            taskSelected = getTasksIndex(x);
        }
        activeProject.removeTask(taskSelected)
    }


    const completeSelectedTask = function(x){
        const taskSelected = getProjectSpecificTask(x);
        activeProject.completeTask(taskSelected);
    }


    const getProjectCompleteTasks = function(){
        return activeProject.getCompleteTasks();
    }


    const getAllTasks = function(){
        const projects = getProjectList();

        const Alltasks = [];

        projects.forEach(project => {
            const tasks = project.getTasksList();
            tasks.forEach(task => {
                Alltasks.push(task)
            })
        })

        return Alltasks;
    }



    const changeTaskProject = function(project, task){
        removeSelectedTask(task)
        project.addTaskIntoProject(task)
    }






    return {newProject, getActiveProject, changeProject, 
        createTask, getProjectTasksList, getProjectSpecificTask,
    removeSelectedTask, completeSelectedTask, getProjectCompleteTasks, getAllTasks,
changeTaskProject, getProject, getProjectList, deleteALLPROJECT}
}


export {ProjectManager}