import { productServices } from "../service/products-service.js";


const url = new URL(window.location);

const q = url.searchParams.get("q").toLowerCase();
const productsContainer = document.querySelector('.products-container');

const search = async (q) => {
    
    const productos = await productServices.listaProductos();
    const resultado = (q == "") ? productos : searcher(productos);
    const cards = crearTarjetasProductos(resultado);
    productsContainer.innerHTML = cards; 
}

const searcher = (productos) => {
    const result = [];
    productos.forEach(producto => {
        let nombre = producto.nombre.toLowerCase();
        if(nombre.includes(q)){
            result.push(producto);       
        }
    });
    return result;
}

function crearTarjetasProductos(productos) {
    let cards = "";
    productos.forEach(producto => {
        
        const {id, nombre, descripcion, precio, imagen, categoria  } = producto;
        cards += `
            <div class="products-card">
                <img class="products-img" src="${imagen}" alt="star wars image">
                <h4>${nombre}</h4>
                <p class="products-price">$${precio}</p>
                <a class="link" href="/alurageek/screens/product-detail.html?id=${id}" data-id="${id}">Ver producto</a>
            </div>`
    })

    return cards;
}

search();












