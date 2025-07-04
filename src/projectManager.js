import { TaskManager } from "./taskManager"


class Project {

    constructor(title){
        this.title = title,
        this.tasks = []
    }


    getTasksList = function(){
        return this.tasks
    }

    
    addTaskIntoProject = function(task){
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


    const createTask = function(title, priority, date, description, project = getProject(0)){
        const task = taskControl.createTask(title, priority, date, description);
        project.addTaskIntoProject(task);
    }



    return {newProject, getProject, createTask}
}


export {ProjectManager}