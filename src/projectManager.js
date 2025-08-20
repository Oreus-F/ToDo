import { TaskManager } from "./taskManager";
import { updateSidebarProjectList } from "./updateDOMProjectSidebar";


const taskControl = TaskManager();


class Project {

    constructor(title, tasks){
        this.title = title,
        this.tasks = Project.parsingTasks(tasks, this.title),
        this.complete = Project.parsingCompletedTasks(tasks, this.title)
    }

    static parsingTasks(tasks, origin){


        const _tasks = [];
        
        if(arguments[0]){
            
            for(let x=0; x < tasks.length; x++){

                const actualTask = tasks[x];
                
                if(actualTask.status === 'to-do'){
                    const newTask = taskControl.createTask(actualTask.title, actualTask._priority, actualTask.formatedDueDate, actualTask.description);
                    newTask.changeOrigin(origin);
                    _tasks.push(newTask);

                } else {

                    return _tasks
                }


            };

            return _tasks

        } else {
            return _tasks
        }

    }


    static parsingCompletedTasks(tasks, origin){

        const _complete = [];

        
        if(arguments[0]){

            
            for(let x=0; x < tasks.length; x++){

                const actualTask = tasks[x];
                
                if(actualTask.status === 'completed'){

                    const newTask = taskControl.createTask(actualTask.title, actualTask._priority, actualTask.formatedDueDate, actualTask.description);
                    newTask.changeOrigin(origin);
                    newTask.changeStatus();
                    _complete.push(newTask);

                } else {
                                   
                    return _complete
                }

            };


            return _complete

        } else {

            return _complete

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


const Inbox = new Project('Inbox');

const projectList = [Inbox];

let activeProject = Inbox;

const ProjectManager = function(){

    


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



    const getProjectFromTask = function(task){
        const target = task.origin;
        const projectList = getProjectList();
        let result;

        projectList.forEach(project => {
            const title = project.title;

            if (title === target) result = project
        });


        return result;
    }


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

        updateLocalStorageProjectList();
    }


    const getProjectTasksList = function(){
        return activeProject.getTasksList();
    }


    const getTaskFromIndex = function(index){
        return activeProject.getTask(index)
    }


    const getTasksIndex = function(task){
        return activeProject.tasks.indexOf(task)
    }


    const getTasksFromObject = function(object){
        const index = getTasksIndex(object);
        const result = getTaskFromIndex(index);
        return result
    }


    const getTaskActiveProject = function(x){
        let taskSelected
        if(typeof(x) === 'number'){
            taskSelected = getTaskFromIndex(x);
        } else {
            taskSelected = getTasksFromObject(x);
        }

        return taskSelected
    } 


    const removeSelectedTask = function(x){
        const taskSelected = getTaskActiveProject(x)
        activeProject.removeTask(taskSelected);

        updateLocalStorageProjectList();
    }


    const completeSelectedTask = function(task){


        if (task.status === 'completed'){
            console.error('This task is already completed')
        } else {
            task.changeStatus();

            if (task.origin == activeProject.title){
                activeProject.completeTask(task);
                activeProject.removeTask(task)
            } else {
                const tempProject = getProjectFromTask(task);
                tempProject.completeTask(task);
                tempProject.removeTask(task);
            }


            updateLocalStorageProjectList(); 
        }
    }


    const getProjectCompleteTasks = function(){
        return activeProject.getCompleteTasks();
    }


    const getAllCompleteTasks = function(){
        const projects = getProjectList();

        const AllComleted = [];

        projects.forEach(project => {
            const tasks = project.getCompleteTasks();
            tasks.forEach(task => {
                AllComleted.push(task)
            });
        });

        return AllComleted
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
        console.log(value)
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




    const createFirstTask = function(){

        
        createTask('Change username', 'low', '01/09/2025', 'In the sidebar you will find a button next to your actual username');
        createTask('Change profile picture', 'low', '02/09/2025', 'In the sidebar you will find a button next to your actual username');
        createTask('Create a new project', 'medium', '03/09/2025', 'In the sidebar you will find a button next to My Projects');
    
        
        newProject('Test')
        
    
        createTask('Create a new task', 'medium', '04/09/2025', '');
        createTask('Remove and complete a task', 'high', '05/09/2025', 'Do both in order to complete this one');
        createTask('Change a task', 'high', '06/09/2025', 'change the title, priority, description, date or all of it');
        createTask('Reset your data', 'low', '07/09/2025', '2 day befors this due date was my birthday and you forgot, you can forget your local data in exchange !');


        createTask('test', 'low', '01/01/2011', 'oui')
        
    }

    return {newProject, getActiveProject, changeProject, 
    removeSelectedTask, completeSelectedTask, getProjectCompleteTasks, getAllTasks, getAllCompleteTasks,
changeTaskProject, getProject, getProjectList, deleteALLPROJECT, parsingProject, setProjectsIntoJSON, 
createFirstTask, updateLocalStorageProjectList}
}


export {ProjectManager}