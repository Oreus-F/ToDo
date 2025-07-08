import {format, intlFormatDistance} from 'date-fns'


class Task {

    constructor(title, priority, dueDate, description){
        this.title = title,
        this.priority = priority,
        this.dueDate = Task.dateInstance(dueDate);
        this.formatedDueDate = format(this.dueDate, 'dd/MM/yyyy')
        this.description = description,
        this.status = 'to-do'
    };


    static dateInstance(date){
        date = date.split('/');
        const _date = new Date(date[2], (date[1] - 1), date[0])
        return _date
    }


    set priority(newPriority) {
        newPriority = newPriority.toLowerCase();
        const possibilies = ['low', 'medium', 'high'];

        if(newPriority === possibilies[0] || newPriority === possibilies[1] || newPriority === possibilies[2]){
            this._priority = newPriority;
        } else {
            console.error('The priority must be "low", "medium" or "high"');
        }
    }


    get priority(){
        return this._priority;
    }
    
 

};


Task.prototype.getTimeLeft = function(){
    return intlFormatDistance(new Date(), this.dueDate)
}


const TaskManager = function(){
    
    const createTask = function(title, priority, date, description){
        const task = new Task(title, priority, date, description);
        return task
    }

    

    return {createTask}
}




export {TaskManager}