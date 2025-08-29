import { eachDayOfInterval, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";

const MONTHS = ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const getCalendarDays = function(temoin = new Date()){

    const currentDate = temoin;
    
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    
    const calendarDays = eachDayOfInterval({start: firstDayOfMonth, end: lastDayOfMonth});
    
    return calendarDays
    
};


const addOneMonth = function(temoin){

    const dayTemoin = temoin[0];

    const dateOneMonthLater = addMonths(dayTemoin, 1);

    const calendar = getCalendarDays(dateOneMonthLater);

    return calendar
}


const subOneMonth = function(temoin){

    const dayTemoin = temoin[0];

    const dateOneMonthBefore = subMonths(dayTemoin, 1);

    const calendar = getCalendarDays(dateOneMonthBefore);

    return calendar
}



const createCalendar = function(calendarDays){
    
}


export {getCalendarDays, addOneMonth, subOneMonth, createCalendar}