import { productServices } from "../service/products-service.js"

(function () {
    const emailSession = sessionStorage.getItem('email');
    if(emailSession == null) {
        window.location.href = "./login.html";
    }
})();

window.onload = cargaCategorias();

const formulario = document.querySelector("[data-form]");
const select = document.querySelector("[data-select]");
const imgFile = document.querySelector("[data-img]");



const cuadro = document.querySelector("[data-cuadro]");

cuadro.addEventListener("dragover", (e) => {
  e.preventDefault();
});
cuadro.addEventListener("dragleave", (e) => {
  e.preventDefault();
});

cuadro.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  processFile(file);
});

imgFile.addEventListener("change", event => {
    if(event.target.files.length > 0){
        const file = event.target.files[0];
        processFile(file);
    }
});
//cuadro.addEventListener("click", importData);

var imgPath = null;

const processFile = (file) => {
  const docType = file.type;
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
  if (validExtensions.includes(docType)) {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (e) => {
      const fileUrl = fileReader.result;
      console.log(fileUrl);
      const clear = document.querySelector("[data-clear]");
      imgPath = fileUrl;
      cuadro.style.backgroundImage = `url(${fileUrl})`;
      cuadro.style.backgroundSize = "cover";
      cuadro.style.backgroundRepeat = "no-repeat";
      cuadro.style.backgroundPosition = "center";
      clear.style.display = "none";
    });

    fileReader.readAsDataURL(file);
  } else {
    alert("El archivo no es valido");
  } 
};


function cargaCategorias() {
    productServices.listaCategoria().then((data) => {
        let categorias = {};
        data.forEach((producto) => {
            if(!categorias.hasOwnProperty(producto.categoria)){
                categorias[producto.categoria] = "";
            }
        })

        let options = '';
        for(const categoria in categorias){
            options += `
            <option value="${categoria}">${categoria}</option>     
            `;            
        }
    
        select.innerHTML = options; 
    })
}

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    if(imgPath == null){
        alert("Debe cargar una imagen");
        return;
    }
    const imgData = imgPath;
    const nombreValue = document.querySelector("[data-nombre]").value;
    const precioValue = document.querySelector("[data-precio]").value;
    const descripcionValue = document.querySelector("[data-descripcion]").value;
    const selectValue = document.querySelector("[data-select]").value;

    await productServices.crearProducto(nombreValue, descripcionValue, precioValue, imgData, selectValue).then( (respuesta) => {
        console.log(respuesta);
    })
    .catch((err) => console.log(err));

    window.location.href = "product-added-ok.html";
})
 
