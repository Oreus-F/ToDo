import {format, intlFormatDistance} from 'date-fns'


class Task {

    constructor(title, priority, dueDate, description = '', origin = 'default'){
        this.title = title,
        this.priority = priority,
        this.dueDate = Task.dateInstance(dueDate);
        this.formatedDueDate = format(this.dueDate, 'dd/MM/yyyy')
        this.description = description,
        this.status = 'to-do',
        this.origin = origin,
        this.id = crypto.randomUUID()
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
    return intlFormatDistance(this.dueDate, new Date())
}


Task.prototype.changeOrigin = function(_newOrigin){
    this.origin = _newOrigin
}


Task.prototype.changeStatus = function(){
    this.status = this.status === 'to-do' ? 'completed' : 'to-do';
}


const TaskManager = function(){
    
    const createTask = function(title, priority, date, description, origin){
        const task = new Task(title, priority, date, description, origin);
        return task
    }

    
    

    return {createTask}
}




export {TaskManager}