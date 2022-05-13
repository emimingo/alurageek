import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll(".input");
let path = window.location.pathname;
const inputContact = document.querySelectorAll(".input-contact");
const buttonSubmitContact = document.querySelector(".button-submit-contact");
const buttonSubmitAdd = document.querySelector(".button-submit-add");
const inputLogin = document.querySelectorAll('.login-input');
const buttonLogin = document.querySelector('.btn-login');
const buttonLoginHeader = document.querySelector('.header-btn-login');
const loginInfo = document.querySelector('.login-info');
const buttonCerrarSesion = document.querySelector('.btn-cerrar-sesion');
const inputSearch = document.querySelector('.header-input--search');
const btnLogin = document.querySelector(".header-btn-login");
const btnBanner = document.querySelector(".btn-banner");

(function () {
    const emailSession = sessionStorage.getItem('email');
    if(emailSession) {
        buttonLoginHeader.classList.add("no-display");
        loginInfo.textContent = `Hola, ${emailSession}`;
        loginInfo.classList.remove('no-display');
        buttonCerrarSesion.classList.remove('no-display');
    }
})();

buttonCerrarSesion.addEventListener('click', () => {
    sessionStorage.removeItem('email');
    window.location.href = '/alurageek/index.html';
});

inputSearch.addEventListener('keydown', (e) =>{
    if(e.key == 'Enter'){
        const busqueda = inputSearch.value;
        window.location.href = `/alurageek/screens/search.html?q=${busqueda}`;
    }
});

inputs.forEach(input => {
    if(input.type == "file"){
        
        input.addEventListener('click', (input) => {
            valida(input.target, inputs, buttonSubmitAdd);
        });
        input.addEventListener('change', (input) => {
            valida(input.target, inputs, buttonSubmitAdd);
        });
        return;
    }

    input.addEventListener("blur", (input) => {
        valida(input.target, inputs, buttonSubmitAdd);
    });
    input.addEventListener("keyup", (input) => {
        valida(input.target, inputs, buttonSubmitAdd);
    });
    
}); 


inputContact.forEach(input => {
        
    input.addEventListener("blur", (input) => {
        valida(input.target, inputContact, buttonSubmitContact);
    });
    input.addEventListener("keyup", (input) => {
        valida(input.target, inputContact, buttonSubmitContact);
    });
    
}); 

inputLogin.forEach(input => {
    
    input.addEventListener("blur", (input) => {
        valida(input.target, inputLogin, buttonLogin);
    });
    input.addEventListener("keyup", (input) => {
        valida(input.target, inputLogin, buttonLogin);
    });
});

btnLogin.addEventListener("click", e => {
    window.location.href = "login.html";
});

if(path == "/" || path == "/index.html"){
    btnBanner.addEventListener("click", e => {
        window.location.href = "#consolas"
});
}







