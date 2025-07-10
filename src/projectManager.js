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
    this.tasks.push(task);
    task.changeOrigin(this.title)
}


Project.prototype.removeTask = function(task){
    console.log(task)
    this.tasks.splice(task, 1);
    console.log(this.tasks)
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



    const getProjectList = function(){
        return projectList
    }


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
        task.changeOrigin(activeProject.title)
        activeProject.addTaskIntoProject(task);
    }


    const getProjectTasksList = function(){
        return activeProject.getTasksList();
    }


    const getProjectSpecificTask = function(x){
        return activeProject.getTask(x)
    }


    const removeSelectedTask = function(x){
        console.log(x);
        const taskSelected = getProjectSpecificTask(x);
        console.log(taskSelected)
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
        let index = activeProject.tasks.indexOf(task)


        removeSelectedTask(index)
        console.log(activeProject.getTasksList())
        project.addTaskIntoProject(task)

    }

    return {newProject, getActiveProject, changeProject, 
        createTask, getProjectTasksList, getProjectSpecificTask,
    removeSelectedTask, completeSelectedTask, getProjectCompleteTasks, getAllTasks,
changeTaskProject, getProject}
}


export {ProjectManager}