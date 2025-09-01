import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';
import { displayToday } from "./todayButton";

import { getCalendarDays, addOneMonth, subOneMonth, createCalendar, createCalendarArray, getOneMonthBefore } from './bookingCalendar';


launchPage();


displayToday();

const todayCalendar = getCalendarDays();

const todayBookingCalendar = createCalendarArray(todayCalendar);

console.log(todayBookingCalendar);

const previousMonth = getOneMonthBefore(todayBookingCalendar);

console.log(previousMonth)
