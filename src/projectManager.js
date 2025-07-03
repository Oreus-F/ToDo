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
    const projectList = [defaultProject]


    const newProject = function(title){
        const project = new Project(title);
        projectList.push(project);
    };


    const getProjectList = function(x){
        return projectList[x]
    };



    return {newProject, getProjectList}
}


export {ProjectManager}