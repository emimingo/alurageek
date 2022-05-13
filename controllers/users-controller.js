import { clientServices } from "../service/users-service.js"

const formularioLogin = document.querySelector("[data-form]");
const btnLogin = document.querySelector(".btn-login");

(function () {
    const emailSession = sessionStorage.getItem('email');
    if(emailSession) {
        window.location.href = "./all-products.html";
    }
})();

formularioLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    let usuarios = await obtenerUsuarios();
    const inputEmail = document.querySelector("#email").value;
    const inputPass = document.querySelector("#password").value;
    const datos = { 
        "email": inputEmail,
        "password": inputPass
    };
    if(!validaUsuario(usuarios, datos)){
        
        window.location.href = "./login-error.html";
        return;
    }
    const emailSession = sessionStorage.getItem('email');
    if(emailSession == null) {
        sessionStorage.setItem("email", datos.email);
        window.location.href = "./login-ok.html";
    }else{
        alert("Ya estas logueado");
    }
    
});

const obtenerUsuarios = () => {
    
    let data = clientServices.listaUsuarios().then((respuesta) => respuesta).catch((error) => console.log(error));
    return data;
}

const validaUsuario = (usuarios, datos) => {
    const indexed = usuarios.reduce((acc, el) => ({
        ...acc,
        [el.email]: el,
    }), {})
    const usuario = indexed[datos.email];
    if(!usuario) { 
        return false;
    }
    if(usuario.password != datos.password){
        return false;
    }
    return true;
}



