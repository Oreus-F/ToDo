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

let activeProject = Inbox;

const ProjectManager = function(){

    


    const newProject = function(title, tasks, completed){
        const project = new Project(title, tasks, completed);
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


    const getProjectFromTitle = function(target){
        const projectList = getProjectList();
        
        let result;

        projectList.forEach(project => {
            const title = project.title;

            if (title === target) result = project
        });

        return result
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
        console.log(typeof(x))
        let projectSelected;
        if(typeof(x) === 'number'){
            projectSelected = getProject(x);
        } else if (typeof(x) === 'string'){
            projectSelected = getProjectFromTitle(x)
        } else {
            let index = getProjectIndex(x)
            projectSelected = getProject(index);
        }
        activeProject = projectSelected;
    };


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


    const getTaskFromIndex = function(index, project){
        return project.getTask(index)
    }


    const getTasksIndex = function(task, project){
        return project.tasks.indexOf(task)
    }


    const getTasksFromObject = function(object){
        console.log(object)
        const thisProject = getProjectFromTask(object);
        const index = getTasksIndex(object, thisProject);

        const result = getTaskFromIndex(index, thisProject);

        return result
    }


    const selectThisTask = function(x){
        let taskSelected
        if(typeof(x) === 'number'){
            taskSelected = getTaskFromIndex(x);
        } else {
            taskSelected = getTasksFromObject(x);
        }

        return taskSelected
    } 


    const removeSelectedTask = function(x){


        const taskSelected = selectThisTask(x);
        console.log(taskSelected)
        
        const thisProject = getProjectFromTask(taskSelected);

        thisProject.removeTask(taskSelected);

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
        project.addTaskIntoProject(task);

        updateLocalStorageProjectList()
    }


    const changeTaskDueDate = function(task, newDate){
        task.changeDate(newDate);

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
    
        newProject('Test')
        
        createTask('Create a new task', 'medium', '25/09/2025', '');
        createTask('Remove and complete a task', 'high', '26/09/2025', 'Do both in order to complete this one');
        createTask('Edit a task', 'high', '26/09/2025', 'change the title, priority, description, date or all of it');
        createTask('Reset your data', 'low', '27/09/2025', '2 day befors this due date was my birthday and you forgot, you can forget your local data in exchange !');

    }


    return {newProject, createTask, getProjectList, changeProject, removeSelectedTask, completeSelectedTask, getProjectCompleteTasks, getAllCompleteTasks,
 getAllTasks, changeTaskProject, changeTaskDueDate, setProjectsIntoJSON,  parsingProject, 
createFirstTask }
}


export {ProjectManager}