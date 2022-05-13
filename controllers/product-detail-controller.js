import { productServices } from "../service/products-service.js";

const productosSimilares = (categoria, id) => {
    let productSimil = [];
    productServices.listaProductos().then((data) => {
        
        data.forEach((producto) => {
            if(producto.categoria == categoria && producto.id != id){
                productSimil.push(producto);
            }
        })
        mostrarProductosSimilares(productSimil);
    });
}

const mostrarProductosSimilares = (productos) => {

    const productsContainer = document.querySelector('.products-container');

    let cards = '';
    productos.forEach(producto => {
        cards += `
                    <div class="products-card">
                        <img class="products-img" src="${producto.imagen}" alt="consola image">
                        <h4>${producto.nombre}</h4>
                        <p class="products-price">${producto.precio}</p>
                        <a class="link" href="./product-detail.html?id=${producto.id}">Ver producto</a>
                    </div>
                `;
    })
    productsContainer.innerHTML = cards;
}

const obtenerInformacion = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const productImg = document.querySelector(".products-img");
    const productName = document.querySelector(".product-name");
    const productPrice = document.querySelector(".products-price");
    const productText = document.querySelector(".product-detail-text");

    productServices.detalleProducto(id).then((producto) => {
        productImg.setAttribute("src",`${producto.imagen}`);
        productName.innerText = producto.nombre;
        productPrice.innerText = producto.precio;
        productText.innerText = producto.descripcion;
        
        productosSimilares(producto.categoria, producto.id);
        
    });
}

obtenerInformacion();



