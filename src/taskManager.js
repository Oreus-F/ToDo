


class Task {

    constructor(title, priority, dueDate, description){
        this.title = title,
        this.priority = priority,
        this.dueDate = dueDate,
        this.description = description,
        this.status = 'to-do'
    };


    set priority(newPriority) {
        newPriority = newPriority.toLowerCase();
        const possibilies = ['low', 'medium', 'high'];

        if(newPriority === possibilies[0] || newPriority === possibilies[1] || newPriority === possibilies[2]){
            this._priority = newPriority;
        } else {
            console.error('Priority attribute must be "low", "medium" or "high"');
        }
    }


    get priority(){
        return this._priority;
    }
    
 

};


Task.prototype.newDate = function(){
    console.log(this.dueDate)
}


const TaskManager = function(){
    
    const createTask = function(title, priority, date, description){
        const task = new Task(title, priority, date, description);
        return task
    }

    

    return {createTask}
}




export {TaskManager}