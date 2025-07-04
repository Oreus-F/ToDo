import { TaskManager } from "./taskManager"


class Project {

    constructor(title){
        this.title = title,
        this.tasks = []
    }


    getTasksList = function(){
        return this.tasks
    }


    getTask = function(x){
        return getTasksList()[x]
    }

    
    addTaskIntoProject = function(task){
        this.tasks.push(task)
    }
};



const ProjectManager = function(){
    const defaultProject = new Project('default');
    const projectList = [defaultProject];
    let actualProject = defaultProject;
    
    const taskControl = TaskManager();


    const newProject = function(title){
        const project = new Project(title);
        projectList.push(project);
    };


    const getProject = function(x){
        return projectList[x]
    };


    const getActualProject = function(){
        return actualProject
    };


    const changeProject = function(x){
        actualProject = getProject(x);
    };


    const createTask = function(title, priority, date, description){
        const task = taskControl.createTask(title, priority, date, description);
        actualProject.addTaskIntoProject(task);
    }





    return {newProject, getActualProject, changeProject, createTask}
}


export {ProjectManager}