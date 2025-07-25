import { createContentTemplate } from "./contentTemplate";

const displayTodayContent = function(){
    const content = document.querySelector('#content');

    content.appendChild(createContentTemplate('Today', '05/09/2025', 'x tasks for today'));
}


export {displayTodayContent}