import { eachDayOfInterval, startOfMonth, endOfMonth, addMonths, subMonths} from "date-fns";

const MONTHS = ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const NUMB_OF_WEEKS = 6;

const WEEK = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


const getCalendarDays = function(temoin = new Date()){

    const currentDate = temoin;
    
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    
    const calendarDays = eachDayOfInterval({start: firstDayOfMonth, end: lastDayOfMonth});

    return calendarDays
    
};


const addOneMonth = function(temoin){

    const dayTemoin = temoin instanceof Date ? temoin : temoin[0];

    const dateOneMonthLater = addMonths(dayTemoin, 1);

    const calendar = getCalendarDays(dateOneMonthLater);

    return calendar
}


const subOneMonth = function(temoin){

    const dayTemoin = temoin instanceof Date ? temoin : temoin[0];

    const dateOneMonthBefore = subMonths(dayTemoin, 1);

    const calendar = getCalendarDays(dateOneMonthBefore);

    return calendar
}


const checkDay = function(date, day){
    let dateDay = date.getDay();
    dateDay = DAYS[dateDay]

    return dateDay === day ? true : false
} 


const createCalendarArray = function(calendarDays){
    

    const fullCalendar = [];

    const firstDay = calendarDays[0];
    const fdIsMonday = checkDay(firstDay, 'monday');

    let indexDay = 0;
    let nextMonthIndex = 0;

    const previousMonth = subOneMonth(calendarDays)
    const nextMonth = addOneMonth(calendarDays);

    for(let x=0; x < NUMB_OF_WEEKS; x++){

        let week = []

        for (let y = 0; y < DAYS.length; y++){
            
            let actualDay = calendarDays[indexDay];

            if(indexDay >= calendarDays.length){

                actualDay = nextMonth[nextMonthIndex];
                nextMonthIndex++


            } else if (actualDay === firstDay && !fdIsMonday){
                
                const result = inputPreviousDay(actualDay, previousMonth, y)
                
                y = result.newIndex
                week = result.weekStart;

            }
            
            indexDay++

            week.push(actualDay)

        }

        fullCalendar.push(week);
    }


    return fullCalendar
    
}


const inputPreviousDay = function(firstDay, previousMonth, index){
    const firstDayIndex = firstDay.getDay();
    const dayOfWeek = DAYS[firstDayIndex];
    const daysBefore = WEEK.indexOf(dayOfWeek);

    const result = {}
    result.newIndex = daysBefore;

    const lastDay = previousMonth.length - 1

    const week = [];

    for(let a = 0; a < daysBefore; a++){
        const index = lastDay - a;
        
        week.unshift(previousMonth[index])
    }
    
    result.weekStart = week;
    
    return result
}


const getFirstDay = function(calendarDays){
    let result;
    
    calendarDays.forEach(rows => {
        if(result === undefined){
            result = rows.find(date => date.getDate() == 1);
        }  
    });
    

    return result
}


const getOneMonthBefore = function(calendarDays){

    const firstDay = getFirstDay(calendarDays);
    
    const monthBefore = subOneMonth(firstDay);

    const newBookingGrid = createCalendarArray(monthBefore);

    return newBookingGrid

}


const getOneMonthAfter = function(calendarDays){

    const firstDay = getFirstDay(calendarDays);

    const monthAfter = addOneMonth(firstDay);

    const newBookingGrid = createCalendarArray(monthAfter);

    return newBookingGrid
}


export {getCalendarDays, addOneMonth, subOneMonth, createCalendarArray, getOneMonthBefore}