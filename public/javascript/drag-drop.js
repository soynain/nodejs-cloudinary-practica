const imgSeleccionada = document.getElementById('pruebaSel')
const placeholderNombreArchivoForm = document.getElementsByClassName('custom-file-label')[0]
const formulario = document.getElementById('formImg')
const inputEnvioImagen = document.getElementsByClassName('imgSend')[0]
const dragContainer=document.getElementsByClassName('dragContainer')[0]

console.log('prueba')
let file,fileBlob,fileURL;

const bordesNegros=()=>{
    dragContainer.style.borderTop='1.5px black dashed'
    dragContainer.style.borderLeft='1.5px black dashed'
    dragContainer.style.borderBottom='1.5px black dashed'
}

const bordesRojos=()=>{
    dragContainer.style.borderTop='2px rgb(221, 16, 16) dashed'
    dragContainer.style.borderLeft='2px rgb(221, 16, 16) dashed'
    dragContainer.style.borderBottom='2px rgb(221, 16, 16) dashed'
}


dragContainer.addEventListener('dragover', (e)=>{
    e.preventDefault();
    bordesRojos();
})

dragContainer.addEventListener('dragleave', (e)=>{
    e.preventDefault();
    bordesNegros();
})

function allowDrop(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    ev.preventDefault();
    file = ev.dataTransfer.files[0]; //accedes al archivo arrastrado en cruso
    let fileType = ev.dataTransfer.files[0].type;
    let nombre = ev.dataTransfer.files[0].name;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.readAsDataURL(file) //pal tumbnail
        fileReader.onload = () => {
            fileURL = fileReader.result; 
            imgSeleccionada.src = fileURL 
            placeholderNombreArchivoForm.innerHTML = `${nombre}`
           // console.log(fileURL)
           let list = new DataTransfer(); //haces un objeto de tipo datatransfer
           let filee = new File(["content"], file); //haces que tu objeto datatransfer sea contenido pa multer
           list.items.add(file); //lo añades a una lista
           console.table(filee)
           let myFileList = list.files; //con la lista ya tienes los atributos, ademas multer solo permite una subida, da igual si ponen mas archivos aqui
           console.table(list.files) //
           inputEnvioImagen.files=myFileList //envias la lista o el objeto contenido ya construido
        }
    } else {
        alert("Su archivo no es una imágen, escoja un archivo válido");
    }
    /*Terminando de arrastrar los elementos, los listeners de arriba congelan
    al dragContainer y le dejan los bordes rojos
    la solucion es añadir otra vez el hoover después de arrastrar todo*/ 
    dragContainer.addEventListener('mouseenter', (e)=>{
        e.preventDefault();
        bordesRojos();
    })
    
    dragContainer.addEventListener('mouseleave', (e)=>{
        e.preventDefault();
        bordesNegros();
    })
}

