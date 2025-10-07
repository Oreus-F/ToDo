import {compareAsc, format, intlFormatDistance, isToday, isTomorrow, addDays} from 'date-fns'


class Task {

    constructor(title, priority, dueDate, description = '', origin = 'Inbox'){
        this.title = title,
        this.priority = priority,
        this.dueDate = Task.dateInstance(dueDate);
        this.formatedDueDate = format(this.dueDate, 'dd/MM/yyyy')
        this.description = description,
        this.status = 'to-do',
        this.origin = origin;
        this.id = crypto.randomUUID();
        this.completedDate = null;
    };


    static dateInstance(date){

        let _date;

        if(date.length === 0){
            _date = new Date();
        } else {
            date = date.split('/');
            _date = new Date(date[2], (date[1] - 1), date[0])

        }


        return _date
    }


    set priority(newPriority) {
        if(newPriority === undefined){newPriority = 'none'}

        newPriority = newPriority.toLowerCase();
        const choices = ['none', 'low', 'medium', 'high'];

        for(let x=0; x< choices.length; x++){
            if(newPriority === choices[x]){this._priority = newPriority;}
        }

    }


    get priority(){
        return this._priority;
    }
    
 

};


Task.prototype.getTimeLeft = function(){

    let result
    const TODAY = new Date();
    const sixDayLater = addDays(TODAY, 6);
    const compareDate = (compareAsc(sixDayLater, this.dueDate) == true);
    const noneOfPreviousOption = true

    const test = [isToday(this.dueDate), isTomorrow(this.dueDate), compareDate, noneOfPreviousOption]
    const display = ['Today', 'Tomorrow', format(this.dueDate, 'cccc'), intlFormatDistance(this.dueDate, TODAY)];


    for(let x = 0; x < test.length; x++){
        if (test[x] === true){
            return result = display[x]
        }
    }

}


Task.prototype.changeOrigin = function(_newOrigin){
    this.origin = _newOrigin
}


Task.prototype.changeStatus = function(newCompletedDate){
    const TODAY = new Date;
    this.status = this.status === 'to-do' ? 'completed' : 'to-do';
   if(newCompletedDate){
    const newDate = new Date(newCompletedDate);
    this.completedDate = newDate;
   } else {
    this.completedDate = TODAY
   }
}


Task.prototype.changeDate = function(_newDate){
    this.dueDate = Task.dateInstance(_newDate);
    this.formatedDueDate = format(this.dueDate, 'dd/MM/yyyy');
}


const TaskManager = function(){
    
    const createTask = function(title, priority, date, description, origin){
        const task = new Task(title, priority, date, description, origin);
        return task
    }

    
    

    return {createTask}
}




export {TaskManager}