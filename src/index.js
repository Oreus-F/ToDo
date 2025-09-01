import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';
import { displayToday } from "./todayButton";

import { newDate_Panel } from './dialogCreationDOM';
import { getCalendarDays, createCalendarArray, getOneMonthBefore, getOneMonthAfter } from './bookingCalendar';


launchPage();


displayToday();

const todayCalendar = getCalendarDays();

const todayBookingCalendar = createCalendarArray(todayCalendar);

console.log(todayBookingCalendar);


const dialog = document.createElement('dialog');
dialog.setAttribute('class', 'full-h full-w');
const body = document.querySelector('body');


dialog.appendChild(newDate_Panel())



body.appendChild(dialog)
dialog.showModal()