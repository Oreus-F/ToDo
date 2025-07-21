import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';

const control = ProjectManager();

// FOR PARSING INFORMATIONS

launchPage();


const editUserDialog = document.querySelector('#editUserDialog');
editUserDialog.showModal();