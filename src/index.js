import './style.css'
import { launchPage } from './launch'
import { ProjectManager } from './projectManager';



const control = ProjectManager();


launchPage();


// const editPreview = document.querySelector('#userPreviewPicture');
// // const currentPreview = localStorage.getItem('profilePicture');
// // editPreview.setAttribute('src', currentPreview);


// const fileUploader = document.querySelector('#fileUploader');

// fileUploader.addEventListener('change', () => {
//     const file = fileUploader.files[0];

//     const reader = new FileReader();


//     if (file){
//         readFileReader(file, reader)
//     }
    
// })


// const readFileReader = function(file, fileReader){
//     fileReader.addEventListener('load', () => {
//         editPreview.setAttribute('src', fileReader.result);


//         // return a value and do this when submit the form instead of save it with the preview only
//         localStorage.setItem('profilePicture', fileReader.result)
//     });
    
//     fileReader.readAsDataURL(file)
    
// }


const editUserDialog = document.querySelector('#editUserDialog');
editUserDialog.showModal();