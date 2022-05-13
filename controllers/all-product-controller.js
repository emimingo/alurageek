import { productServices } from "../service/products-service.js"

(function () {
    const emailSession = sessionStorage.getItem('email');
    if(emailSession == null) {
        window.location.href = "./login.html";
    }
})();



const btnAgregarProducto = document.querySelector(".btn-agregar-producto");
btnAgregarProducto.addEventListener("click", () => {
    window.location.href = "./add-product.html";
});


productServices.listaProductos().then((data) => {
   const productsContainer = document.querySelector(".products-container");
   let cards = "";
   data.forEach((producto) => {
       
        const productCard = document.createElement('div');
        productCard.classList.add('products-card');
        const cardContain = crearCard(producto);
        productCard.innerHTML = cardContain;

        const btnEliminar = productCard.querySelector('button');
        btnEliminar.addEventListener('click', () => {
            const id = btnEliminar.id;
            generarModal(producto.nombre);
            $("#b").css("display","block");
            $("#borrar").click(function(){
                productServices.eliminarProducto(id).then((respuesta) => {
                    $("#b").hide();
                    window.location.href = './all-products.html';
                }).catch((error) => alert(error));
                
            });
            
        });

        productsContainer.appendChild(productCard);
   });  
   
})

const crearCard = (producto) => {
    let cardContain = `
                     <div class="products-icons">
                        <button class="delete-icons" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
                        <a class="edit-icons" href="./edit-product.html?id=${producto.id}"><i class="fa-solid fa-pencil"></i></a>
                    </div>
                    <img class="products-img" src="${producto.imagen}" alt="star wars image">
                    <h4>${producto.nombre}</h4>
                    <p class="products-price">R$${producto.precio}</p>
                    <p>#${producto.id}</p>
    `;
    return cardContain;
};

const generarModal = (nombreProducto) => {
    const modal = document.querySelector('.modal');
    const modalHTML = `<div class="modal-header">
                    <a href="#" class="cancel cancel-x">X</a>
                </div>
                <div class="modal-content">
                    ¿Quiere eliminar el producto <span class = "bold">${nombreProducto}</span>?
                </div>
                <div class="modal-footer">
                    <button id="borrar" class="btn btn-red btn-borrar">Borrar</button>
                     <button class="cancel btn btn-cancelar">Cancelar</button>
                </div>`;
    modal.innerHTML = modalHTML; 
    
    $(".cancel").click(function(){
        $("#b").hide();
    });
    
}
