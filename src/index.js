import { ProjectManager } from "./projectManager";

const control = ProjectManager();

control.createTask('ranger les cerises', 'low', 'demain', 'oui')
control.createTask('rincer le cocotier', 'medium', '2h', 'il va mourir');
control.createTask('visiter les grands-parents', 'high', '30/09', 'ils vont mourir');


console.log(control.getTasksList());


control.newProject('ToDoList');

console.log(control.getProject(1))