import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';
import { displayToday } from "./todayButton";

import { newDate_Panel, createDialogNewTask } from './dialogCreationDOM';
import { getCalendarDays, createCalendarArray, getOneMonthBefore, getOneMonthAfter} from './bookingCalendar';


launchPage();

displayToday();


const body = document.querySelector('body');

const div1 = document.createElement('div');

const div2 = document.createElement('div');

const div3 = document.createElement('div');

const div4 = document.createElement('div');

const button = document.createElement('button');

const panel = document.createElement('panel');


body.appendChild('')