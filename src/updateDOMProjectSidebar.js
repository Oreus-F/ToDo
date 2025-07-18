const buttonClass =  'menu-button flex-display gap-4 aligned-item';
const iconClass = 'icon-menu-one-project icon-menu flex-basis40px';


const createProjectButton = function(projectName){
    const listedItem = document.createElement('li');

    const button = document.createElement("button");
    button.setAttribute('class', buttonClass);
    button.setAttribute('data-active', 'false')

    const iconSpan = document.createElement('span');
    iconSpan.setAttribute('class', iconClass);

    const div = document.createElement('div');
    div.setAttribute('class', 'flex-first-grow');

    const nameSpan = document.createElement('span');
    nameSpan.setAttribute('class', 'fs11');
    nameSpan.textContent =projectName;

    div.appendChild(nameSpan);

    button.appendChild(iconSpan);
    button.appendChild(div);


    listedItem.appendChild(button)

    return listedItem
}


const updateSidebarProjectList = function(projectsList){
    const sidebarList = document.querySelector('#sidebarProjectList');
    sidebarList.replaceChildren();

    for(let project=0; project < projectsList.length; project++){
        const listedProject = createProjectButton(projectsList[project].title)
        sidebarList.appendChild(listedProject)
    }

}



export {updateSidebarProjectList}