import { ProjectManager } from "./projectManager";

import { formatDistance, format } from "date-fns";

const control = ProjectManager();

control.createTask('ranger les cerises', 'low', '05/07/2025', 'par intensité de la couleur')
control.createTask('rincer le cocotier', 'medium', '04/07/2025', 'arroser à la base du cocotier avec le sceau dans le garage');
control.createTask('visiter les grands-parents', 'high', '21/07/2025', 'rapporter des fleurs pour leur anniversaire de mariage');


console.table(control.getProjectTasksList());

control.newProject('ToDoList');
control.changeProject(1);

control.createTask('dessiner le projet', 'high', '04/07/2025', 'better plans better futur')
control.createTask('évaluer les dessins', 'medium', '05/07/2025', 'Je ne suis pas un expert ta vu');
control.createTask('transmettre à la team', 'high', '05/07/2025', 'Eux ils savent faire, pas moi');


console.table(control.getProjectTasksList());
console.log(control.getProjectSpecificTask(1));

control.removeSelectedTask(1);
console.table(control.getProjectTasksList())


control.changeProject(0);
control.completeSelectedTask(2);
console.table(control.getProjectCompleteTasks())


console.log(control.getProjectSpecificTask(0).getTimeLeft())



// FOR PARSING INFORMATIONS
// const newInstance = function(value){
//     const instance = new Project(value.title, value.tasks);
//     instance.ParsingTasks();
//     return instance
// }
