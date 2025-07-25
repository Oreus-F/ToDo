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

    const inbox = new Project('Inbox');
    
    const projectList = [inbox];
    
    let activeProject = inbox;
    


    const newProject = function(title, tasks){
        const project = new Project(title, tasks);
        projectList.push(project);
        changeProject(project);

        updateLocalStorageProjectList();
        updateSidebarProjectList(getProjectList());
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


    const updateLocalStorageProjectList = function(){
        const _updateList = setProjectsIntoJSON();
        localStorage.setItem('projectList', _updateList)
    }

    const setProjectsIntoJSON = function(){
        return JSON.stringify(getProjectList())
    }


    const newProjectInstance = function(value){
        newProject(value.title, value.tasks);
    }
    
    
    const parsingProject = function(Json){
        
        // delete them not to cause error
        deleteALLPROJECT();
    
        const parsed = JSON.parse(Json);
        
        for(let x=0; x < parsed.length; x++){
            newProjectInstance(parsed[x])
        }
    }


    createTask('Change username', 'low', '01/09/2025', 'In the sidebar you will find a button next to your actual username');
    createTask('Change profile picture', 'low', '02/09/2025', 'In the sidebar you will find a button next to your actual username');
    createTask('Create a new project', 'medium', '03/09/2025', 'In the sidebar you will find a button next to My Projects');
    createTask('Create a new task', 'medium', '04/09/2025', '');
    createTask('Remove and complete a task', 'high', '05/09/2025', 'Do both in order to complete this one');
    createTask('Change a task', 'high', '06/09/2025', 'change the title, priority, description, date or all of it');
    createTask('Reset your data', 'low', '07/09/2025', '2 day befors this due date was my birthday and you forgot, you can forget your local data in exchange !');


    return {newProject, getActiveProject, changeProject, 
        createTask, getProjectTasksList, getProjectSpecificTask,
    removeSelectedTask, completeSelectedTask, getProjectCompleteTasks, getAllTasks,
changeTaskProject, getProject, getProjectList, deleteALLPROJECT, parsingProject, setProjectsIntoJSON}
}


export {ProjectManager}