import { ProjectManager } from "./projectManager";

const control = ProjectManager();


const setProjectIntoJSON = function(){
    return JSON.stringify(control.getProjectList())
}


const newProjectInstance = function(value){
    control.newProject(value.title, value.tasks);
}


const parsingProject = function(Json){
    
    // delete them not to cause error
    control.deleteALLPROJECT();

    const parsed = JSON.parse(Json);
    
    for(let x=0; x < parsed.length; x++){
        newProjectInstance(parsed[x])
    }
}


const launchStorage = function(){
    if(!localStorage.getItem('username')){
        populateStorage();
    } else {
        setStorage();
    }
};


const populateStorage = function(){
    const user = document.querySelector('#username');
    const userPicture = document.querySelector('#userPicture');
    const projectList = setProjectIntoJSON();

    localStorage.setItem('username', user.textContent);
    localStorage.setItem('profilePicture', userPicture.src);
    localStorage.setItem('projectList', projectList);


    setStorage();
};


const setStorage = function(){
    let user = document.querySelector('#username');
    // let userPicture = document.querySelector('#userPicture');
    // console.log(userPicture.src)
    let projectList = control.getProjectList();

    const currentUsername = localStorage.getItem('username');
    // const currentUserPicture = localStorage.getItem('userPicture');
    const currentProject = localStorage.getItem('projectList');


    user.textContent = currentUsername;
    // userPicture.src = currentUserPicture;
    projectList = parsingProject(currentProject)
}


export {launchStorage}



