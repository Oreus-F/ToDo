import { TaskManager } from "./taskManager";
import { updateSidebarProjectList } from "./updateDOMProjectSidebar";


const taskControl = TaskManager();


class Project {

    constructor(title, tasks, complete){
        this.title = title,
        this.tasks = Project.parsingTasks(tasks, this.title),
        this.complete = Project.parsingCompletedTasks(complete, this.title)
    }

    static parsingTasks(tasks, origin){

        const _tasks = [];
        
        if(arguments[0]){

            
            for(let x=0; x < tasks.length; x++){

                const actualTask = tasks[x];
                
                const newTask = taskControl.createTask(actualTask.title, actualTask._priority, actualTask.formatedDueDate, actualTask.description);
                newTask.changeOrigin(origin);
                _tasks.push(newTask);

            };

            return _tasks

        } else {

            return _tasks
        }

    }


    static parsingCompletedTasks(completedTasks, origin){

        const _complete = [];

        
        if(arguments[0]){

            
            for(let x=0; x < completedTasks.length; x++){

                const actualTask = completedTasks[x];

                const newTask = taskControl.createTask(actualTask.title, actualTask._priority, actualTask.formatedDueDate, actualTask.description);
                newTask.changeOrigin(origin);
                newTask.changeStatus();
                _complete.push(newTask);
       

                return _complete

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

const ProjectManager = function(){

    


    const newProject = function(title, tasks, completed){
        const project = new Project(title, tasks, completed);
        projectList.push(project);

        updateLocalStorageProjectList();
        updateSidebarProjectList(getProjectList());
    };


    const getProjectList = function(){
        return projectList
    }


    const createTask = function(title, priority, date, description, origin){
        const task = taskControl.createTask(title, priority, date, description, origin);

        const project = getProject(task);
        project.addTaskIntoProject(task);

        updateLocalStorageProjectList();
    }


    const getProject = function(x){
        const result = typeof(x) === 'string' ? getProjectFromTitle(x) : getProjectFromTask(x);

        return result
    };


    const getProjectFromTitle = function(target){
        const projectList = getProjectList();
        
        let result;

        projectList.forEach(project => {
            const title = project.title;

            if (title === target) result = project
        });

        return result
    }


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


    const deleteALLPROJECT = function(){
        projectList.splice(0, getProjectList().length);
        updateSidebarProjectList(getProjectList());
    }


    const getTask = function(object){
        const target = object.id;

        const projectList = getProjectList();
        let result;

        projectList.forEach(project => {
            const tasks = project.getTasksList();

            tasks.forEach(task => {
                if (task.id === target){
                    result = task
                }
            })
        });


        return result

    } 


    const removeSelectedTask = function(task){

        const thisProject = getProject(task);

        thisProject.removeTask(task);

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
                const tempProject = getProject(task);
                tempProject.completeTask(task);
                tempProject.removeTask(task);
            }


            updateLocalStorageProjectList(); 
        }
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
        
        removeSelectedTask(task);

        const newProject = getProject(project)
        newProject.addTaskIntoProject(task);

        updateLocalStorageProjectList()
    }


    const updateLocalStorageProjectList = function(){
        const _updateList = setProjectsIntoJSON();
        localStorage.setItem('projectList', _updateList)
    }


    const setProjectsIntoJSON = function(){
        return JSON.stringify(getProjectList())
    }


    const newProjectInstance = function(value){
        newProject(value.title, value.tasks, value.complete);
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

        createTask('Edit username', 'low', '25/09/2025', 'In the sidebar you will find a button next to your actual username');
        createTask('Edit profile picture', 'low', '25/09/2025', 'In the sidebar you will find a button next to your actual username');
        createTask('Create a new project', 'medium', '25/09/2025', 'In the sidebar you will find a button next to My Projects');
    
        createTask('Create a new task', 'medium', '25/09/2025', '');
        createTask('Remove and complete a task', 'high', '26/09/2025', 'Do both in order to complete this one');
        createTask('Edit a task', 'high', '26/09/2025', 'change the title, priority, description, date or all of it');
        createTask('Reset your data', 'low', '27/09/2025', '2 day befors this due date was my birthday and you forgot, you can forget your local data in exchange !');
        
        
        newProject('Test')
    }


    return {newProject, createTask, getProjectList, removeSelectedTask, completeSelectedTask, getAllCompleteTasks,
 getAllTasks, changeTaskProject, setProjectsIntoJSON,  parsingProject, 
createFirstTask, getTask, updateLocalStorageProjectList }
}


export {ProjectManager}