class Task {

    constructor(title, priority, date, description){
        this.title = title,
        this.priority = priority,
        this.date = date,
        this.description = description
    };


    set priority(newPriority) {
        newPriority = newPriority.toLowerCase();
        const possibilies = ['low', 'medium', 'high'];

        if(newPriority === possibilies[0] || newPriority === possibilies[1] || newPriority === possibilies[2]){
            this._priority = newPriority;
        } else {
            console.error('Priority attribute must be either "low" "medium" or "high"');
        }
    }


    get priority(){
        return this._priority;
    }

};



const createTask = function(title, priority, date, description){
    return new Task(title, priority, date, description);
}

export {createTask}