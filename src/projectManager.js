import { TaskManager } from "./taskManager"


class Project {

    constructor(title){
        this.title = title,
        this.tasks = []
    }


    getTasks = function(){
        return this.tasks
    }

    
    addTask = function(task){
        this.tasks.push(task)
    }
};






const ProjectManager = function(){
    const defaultProject = new Project('default');
    const projectList = [defaultProject];
    
    const taskControl = TaskManager();


    const newProject = function(title){
        const project = new Project(title);
        projectList.push(project);
    };


    const getProject = function(x){
        return projectList[x]
    };


    const createTask = function(title, priority, date, description, project = getProjectList(0)){
        const task = taskControl.createTask(title, priority, date, description);
        project.addTask(task);
    }


    const getTasksList = function(project = getProject(0)){
        return project.tasks
    }



    return {newProject, getProject, createTask, getTasksList}
}


export {ProjectManager}