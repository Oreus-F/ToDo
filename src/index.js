import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';
import { displayToday } from "./todayButton";

import { getCalendarDays, addOneMonth, subOneMonth, createCalendar, createCalendarArray } from './bookingCalendar';


launchPage();


displayToday();

const todayCalendar = getCalendarDays();

const todayBookingCalendar = createCalendarArray(todayCalendar)

console.log(todayBookingCalendar);
