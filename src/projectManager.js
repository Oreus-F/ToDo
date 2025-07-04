import { TaskManager } from "./taskManager"


class Project {

    constructor(title){
        this.title = title,
        this.tasks = [],
        this.complete = []
    }


    getTasksList = function(){
        return this.tasks
    }


    getTask = function(x){
        return this.tasks[x]
    }

    
    addTaskIntoProject = function(task){
        this.tasks.push(task)
    }


    removeTask = function(task){
        this.tasks.splice(task, 1)
    }


    completeTask = function(task){
        this.complete.push(task)
    }
};



const ProjectManager = function(){
    const defaultProject = new Project('default');
    const projectList = [defaultProject];
    let activeProject = defaultProject;
    
    const taskControl = TaskManager();


    const newProject = function(title){
        const project = new Project(title);
        projectList.push(project);
    };


    const getProject = function(x){
        return projectList[x]
    };


    // Maybe not needed will see
    const getActiveProject = function(){
        return activeProject
    };


    const changeProject = function(x){
        activeProject = getProject(x);
    };


    const createTask = function(title, priority, date, description){
        const task = taskControl.createTask(title, priority, date, description);
        activeProject.addTaskIntoProject(task);
    }


    const getProjectTasksList = function(){
        return activeProject.getTasksList();
    }


    const getProjectSpecificTask = function(x){
        return activeProject.getTask(x)
    }


    const removeSelectedTask = function(x){
        const taskSelected = getProjectSpecificTask(x);
        activeProject.removeTask(taskSelected)
    }


    const completeSelectedTask = function(x){
        const taskSelected = getProjectSpecificTask(x);
        activeProject.completeTask(taskSelected);
    }


    return {newProject, getActiveProject, changeProject, 
        createTask, getProjectTasksList, getProjectSpecificTask,
    removeSelectedTask, completeSelectedTask}
}


export {ProjectManager}