const listaProductos = () => fetch("https://challenge-alurageek.herokuapp.com/productos").then((respuesta) => respuesta.json());

const listaCategoria = () => fetch("https://challenge-alurageek.herokuapp.com/productos").then((respuesta) => respuesta.json());

const crearProducto = (nombre, descripcion, precio, imagen, categoria) => {
 return fetch("https://challenge-alurageek.herokuapp.com/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: uuid.v4(), nombre, descripcion, precio, imagen, categoria}),
    });
};

const detalleProducto = (id) => {
    return fetch(`https://challenge-alurageek.herokuapp.com/productos/${id}`).then((respuesta) => respuesta.json());
};

const actualizarProducto = (id, nombre, descripcion, precio, imagen, categoria) => {
    return fetch(`https://challenge-alurageek.herokuapp.com/productos/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre, descripcion, precio, imagen, categoria})
    }).then((respuesta) => respuesta)
    .catch((err) => console.log(err));
} 

 const eliminarProducto = (id) => {
    return fetch(`https://challenge-alurageek.herokuapp.com/productos/${id}`,{
        method: 'DELETE',
    });
}

export const productServices = {
    listaProductos, 
    listaCategoria,
    crearProducto,
    detalleProducto,
    actualizarProducto,
    eliminarProducto,
}





