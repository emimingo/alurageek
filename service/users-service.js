const listaUsuarios = () => fetch("https://challenge-alurageek.herokuapp.com/usuarios").then((respuesta) => respuesta.json());

export const clientServices = {
    listaUsuarios,
}