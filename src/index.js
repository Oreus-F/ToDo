import { ProjectManager } from "./projectManager";

const control = ProjectManager();

control.createTask('ranger les cerises', 'low', 'demain', 'oui')
control.createTask('rincer le cocotier', 'medium', '2h', 'il va mourir');
control.createTask('visiter les grands-parents', 'high', '30/09', 'ils vont mourir');


console.table(control.getProjectTasksList());

control.newProject('ToDoList');
control.changeProject(1);

control.createTask('dessiner le projet', 'high', '04/07/25', 'better plans better futur')
control.createTask('évaluer les dessins', 'medium', '05/07/25', 'Je ne suis pas un expert ta vu');
control.createTask('transmettre à la team', 'high', '05/07/25', 'Eux ils savent faire, pas moi');


console.table(control.getProjectTasksList());
console.log(control.getProjectSpecificTask(1));

control.removeTask(1);
console.table(control.getProjectTasksList())