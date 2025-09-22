import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';
import { displayToday } from "./todayButton";

import { newDate_Panel, createDialogNewTask } from './dialogCreationDOM';
import { getCalendarDays, createCalendarArray, getOneMonthBefore, getOneMonthAfter} from './bookingCalendar';


launchPage();


displayToday();
