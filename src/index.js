import { TaskManager } from "./taskManager";

const control = TaskManager();

const task1 = control.createTask('title', 'low', 'demain', 'oui')

console.log(task1)