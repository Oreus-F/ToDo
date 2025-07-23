import { ProjectManager } from "./projectManager";


const control = ProjectManager()


const launchStorage = function(target){
    if(!localStorage.getItem('username')){
        populateStorage();
        setStorage();
    } else {
        setStorage();
    }
};


const populateStorage = function(){
    
    const user = document.querySelector('#username');
    const userPicture = document.querySelector('#userPicture');
    const projectList = control.setProjectsIntoJSON();
    
    localStorage.setItem('username', user.textContent);
    localStorage.setItem('profilePicture', userPicture.src);
    localStorage.setItem('projectList', projectList);
}


const setStorage = function(){
    const user = document.querySelector('#username');
    const userPicture = document.querySelector('#userPicture');
    
    const currentUsername = localStorage.getItem('username');
    const currentUserPicture = JSON.stringify(localStorage.getItem('profilePicture'));
    const currentProject = localStorage.getItem('projectList');

    user.textContent = currentUsername;
    userPicture.src = JSON.parse(currentUserPicture);
    
    control.parsingProject(currentProject)

}


export {launchStorage}