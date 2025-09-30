import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';
import { displayToday } from "./todayButton";

import { newDate_Panel, createDialogNewTask } from './dialogCreationDOM';
import { getCalendarDays, createCalendarArray, getOneMonthBefore, getOneMonthAfter} from './bookingCalendar';


launchPage();

displayToday();



const createTestPanel = function(){
const body = document.querySelector('body');

const div1 = document.createElement('div');

div1.setAttribute('data-taskPanel', 'true')

const div2 = document.createElement('div');

const div3 = document.createElement('div');

const div4 = document.createElement('div');

const button = document.createElement('button');



const customID = crypto.randomUUID();
div1.setAttribute('id', customID)

button.textContent = "THIS IS AN IMPORTANT TEST"

button.addEventListener('click', (event) => {
    const target = event.currentTarget;
    toggleTest(target)


})

div4.appendChild(button);
div3.appendChild(div4);
div2.appendChild(div3);
div1.appendChild(div2)
body.appendChild(div1);

}



const findFirstParent = function(target){
    let x = 0;
    let actualTarget = target
    let result;
    let checkData = false;

    while(checkData === false || x < 6){
        const parent = actualTarget.parentElement;
        const dataParent = parent.getAttribute('data-taskPanel');

        dataParent === 'true' ? checkData = true : actualTarget = parent;

        result = parent
        x += 1       
    }


    return result
}



const toggleTest = function(target){
    const container = target.parentElement;
    const panel = document.querySelector('#thisPanel');


    console.log(panel)

    if (panel === null){
        container.appendChild(appendTestPanel());

        const actualPanel = container.lastChild;

        const parent = findFirstParent(target);

        console.log(actualPanel);
        console.log(parent);
        console.log(container)
    } else {
        container.removeChild(panel)
    }
}


const appendTestPanel = function(){
    const panel = document.createElement('panel');
    panel.setAttribute('id', "thisPanel");


    return panel
}

createTestPanel();

