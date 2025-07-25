


const createToday = function(){
    const div = document.createElement('div');
    div.setAttribute('class', 'full-h flex-display column-direction');


    const headerDiv = document.createElement('div');
    headerDiv.setAttribute('class', 'flex-basis120px flex-display');

    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'flex-first-grow');

    const titleSpan = document.createElement('span');
    const h1Title = document.createElement('h1');

    

    

    const dateDiv = document.createElement('div');
    dateDiv.setAttribute('class', 'flex-basis200px flex-display justif-content-center aligned-item-center');

    const dateSpan = document.createElement('span');

    const h3Date = document.createElement('h3');
    h3Date.setAttribute('id', 'todayActualDate');
    h3Date.textContent = '05/09/1995'


    dateSpan.appendChild(h3Date);
    dateDiv.appendChild(dateSpan);

    headerDiv.appendChild(titleDiv);
    headerDiv.appendChild(dateDiv);


    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('class', 'flex-first-grow')

    

    div.appendChild(headerDiv);
    div.appendChild(contentDiv);


    return div
}




const displayTodayContent = function(){
    const content = document.querySelector('#content');

    content.appendChild(createToday())
}


export {displayTodayContent}