const buttonClass =  'menu-button flex-display gap-4 aligned-item-center';
const iconClass = 'icon-menu-one-project flex-noshrink icon-menu flex-basis40px';


const createProjectButton = function(projectName){
    
    const listedItem = document.createElement('li');

    const button = document.createElement("button");
    button.setAttribute('class', buttonClass);
    button.setAttribute('data-active', 'false');
    button.setAttribute('data-target', projectName)

    const iconSpan = document.createElement('span');
    iconSpan.setAttribute('class', iconClass);

    const div = document.createElement('div');
    div.setAttribute('class', 'flex-first-grow full-w');

    const nameSpan = document.createElement('p');
    nameSpan.setAttribute('class', 'fs11 text-overflow');
    nameSpan.textContent = projectName;

    div.appendChild(nameSpan);

    const deleteSpan = document.createElement('span');
    deleteSpan.style.height = '20px';
    deleteSpan.style.width = '20px';
    
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'full-w full-h delete-project-icon');

    deleteButton.setAttribute('data-delete', 'true');

    deleteSpan.appendChild(deleteButton)



    button.appendChild(iconSpan);
    button.appendChild(div);
    button.appendChild(deleteSpan)


    listedItem.appendChild(button)

    return listedItem
}


const updateSidebarProjectList = function(projectsList){


    const sidebarList = document.querySelector('#sidebarProjectList');
    sidebarList.replaceChildren();

    for(let index= 1; index < projectsList.length; index++){
        const listedProject = createProjectButton(projectsList[index].title)
        sidebarList.appendChild(listedProject)
    }

}


export {updateSidebarProjectList}