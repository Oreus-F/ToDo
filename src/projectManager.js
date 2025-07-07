import { TaskManager } from "./taskManager"


class Project {

    constructor(title, tasks = []){
        this.title = title,
        this.tasks = tasks,
        this.complete = []
    }
};


Project.prototype.getTasksList = function(){
    return this.tasks
}


Project.prototype.addTaskIntoProject = function(task){
    this.tasks.push(task)
}


Project.prototype.getTask = function(x){
    return this.tasks[x]
}


Project.prototype.addTaskIntoProject = function(task){
    this.tasks.push(task)
}


Project.prototype.removeTask = function(task){
    this.tasks.splice(task, 1)
}


Project.prototype.completeTask = function(task){
    this.complete.push(task)
}


Project.prototype.getCompleteTasks = function(){
    return this.complete
}


Project.prototype.ParsingTasks = function(){
    for(let x=0; x < this.tasks.length; x++){
        let task = this.tasks[x]
        task = new Task(task.name, task.priority, task.dueDate, task.description);
        task.newDate()
        this.tasks[x] = task
    }
}


const ProjectManager = function(){
    const taskControl = TaskManager();

    const defaultProject = new Project('default');
    const projectList = [defaultProject];
    
    let activeProject = defaultProject;
    


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


    const getProjectCompleteTasks = function(){
        return activeProject.getCompleteTasks();
    }


    return {newProject, getActiveProject, changeProject, 
        createTask, getProjectTasksList, getProjectSpecificTask,
    removeSelectedTask, completeSelectedTask, getProjectCompleteTasks}
}


export {ProjectManager}