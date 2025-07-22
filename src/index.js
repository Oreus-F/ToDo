import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';



const control = ProjectManager();

// FOR PARSING INFORMATIONS

launchPage();


const editPreview = document.querySelector('#userPreviewPicture');
// const currentPreview = localStorage.getItem('profilePicture');
// editPreview.setAttribute('src', currentPreview);


const fileUploader = document.querySelector('#fileUploader');

fileUploader.addEventListener('change', () => {
    const file = fileUploader.files[0];

    const reader = new FileReader();


    if (file){
        readFileReader(file, reader)
    }
    
})


const readFileReader = function(file, fileReader){
    fileReader.addEventListener('load', () => {
        editPreview.setAttribute('src', fileReader.result);
        localStorage.setItem('profilePicture', fileReader.result)
    });
    
    fileReader.readAsDataURL(file)
    
}


const editUserDialog = document.querySelector('#editUserDialog');
editUserDialog.showModal();