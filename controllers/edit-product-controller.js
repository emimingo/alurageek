import { productServices } from "../service/products-service.js"


const nombreProducto = document.querySelector("[data-nombre]");
const precioProducto = document.querySelector("[data-precio]");
const descripcionProducto = document.querySelector("[data-descripcion]");
const select = document.querySelector("[data-select]");
const btnModificarProducto = document.querySelector(".button-submit-add");

const formulario = document.querySelector("[data-form]");


const imgFile = document.querySelector("[data-img]");
const cuadro = document.querySelector("[data-cuadro]");
const clear = document.querySelector("[data-clear]");

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

imgFile.addEventListener("change", event => {
    if(event.target.files.length > 0){
        const file = event.target.files[0];
        processFile(file);
    }
});

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(imgPath == null){
        alert("Debe cargar una imagen");
        return;
    }

    const url = new URL(window.location);
    const id = url.searchParams.get("id");


    const nombre = nombreProducto.value;
    const descripcion = descripcionProducto.value;
    const precio = precioProducto.value;
    const imagen = imgPath;
    console.log(imagen)
    const categoria = select.value;
    
 
    await productServices.actualizarProducto(id, nombre, descripcion, precio, imagen, categoria).then(() => {
        
    });

    window.location.href = "product-edited-ok.html";

    

});


const obtenerInformacion = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    productServices.detalleProducto(id).then((producto) => {
        cargarCategorias(producto.categoria);
        
        imgPath = producto.imagen;  
        cuadro.style.backgroundImage = `url(${producto.imagen})`;
        cuadro.style.backgroundSize = "cover";
        cuadro.style.backgroundRepeat = "no-repeat";
        cuadro.style.backgroundPosition = "center";
        clear.style.display = "none";

        nombreProducto.value = producto.nombre;
        precioProducto.value = producto.precio;
        descripcionProducto.value = producto.descripcion;
        
    });
}

const cargarCategorias = (category) => {
    

    productServices.listaCategoria().then((data) => {
        let categorias = {};
        data.forEach((producto) => {
            if(!categorias.hasOwnProperty(producto.categoria)){
                categorias[producto.categoria] = "";
            }
        })

        let options = '';
        for(const categoria in categorias){
            if(categoria == category){
                options += `
                            <option selected value="${categoria}">${categoria}</option>     
                        `;      
            }else{
                options += `
                            <option value="${categoria}">${categoria}</option>     
                        `;     
            }
                   
        }
    
        select.innerHTML = options; 
    });
}

obtenerInformacion();

