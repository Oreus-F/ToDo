// import { ProjectManager } from "./projectManager";

// const control = ProjectManager();

// control.createTask('ranger les cerises', 'low', '05/07/25', 'par intensité de la couleur')
// control.createTask('rincer le cocotier', 'medium', '04/07/25', 'arroser à la base du cocotier avec le sceau dans le garage');
// control.createTask('visiter les grands-parents', 'high', '21/07', 'rapporter des fleurs pour leur anniversaire de mariage');


// console.table(control.getProjectTasksList());

// control.newProject('ToDoList');
// control.changeProject(1);

// control.createTask('dessiner le projet', 'high', '04/07/25', 'better plans better futur')
// control.createTask('évaluer les dessins', 'medium', '05/07/25', 'Je ne suis pas un expert ta vu');
// control.createTask('transmettre à la team', 'high', '05/07/25', 'Eux ils savent faire, pas moi');


// console.table(control.getProjectTasksList());
// console.log(control.getProjectSpecificTask(1));

// control.removeSelectedTask(1);
// console.table(control.getProjectTasksList())


// control.changeProject(0);
// control.completeSelectedTask(2);
// console.table(control.getProjectCompleteTasks())



class Project{
    constructor(title){
        this.title = title,
        this.tasks = []
    }
}

Project.prototype.addTask = function(task){
    this.tasks.push(task)
}

class Task {
    constructor(name, priority, dueDate, description){
        this.name = name,
        this.priority = priority,
        this.dueDate = dueDate,
        this.description = description
    }
}


const defaultProject = new Project('default');
const task1 = new Task('1st', 'low', '07/07/25', 'ceci is the première first');

defaultProject.addTask(task1);


console.log(defaultProject);


const serialise = JSON.stringify(defaultProject);
console.log(serialise)
const deserialised = JSON.parse(serialise, (key, value) => key === '' ? new Project(value.title) : value);
const test = JSON.parse(serialise, (key, value) => key === 'tasks' ? [value] : 
value)

console.log(test)
