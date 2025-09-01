import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';
import { displayToday } from "./todayButton";

import { createCalendarArray, getOneMonthBefore, getOneMonthAfter } from './bookingCalendar';


launchPage();


displayToday();

const todayCalendar = getCalendarDays();

const todayBookingCalendar = createCalendarArray(todayCalendar);

console.log(todayBookingCalendar);
