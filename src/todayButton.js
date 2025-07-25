


const createTemplate_Today = function(){
    const div = document.createElement('div');
    div.setAttribute('class', 'full-h');













    return div
}




const displayTodayContent = function(){
    const content = document.querySelector('#content');

    content.appendChild(createTemplate_Today())
}


export {displayTodayContent}