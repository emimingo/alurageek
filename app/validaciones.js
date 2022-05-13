export function valida(input, inputs, button) {
    
    const tipoDeInput = input.dataset.tipo;

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
        submitControler(inputs, button);
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
        submitControler(inputs, button);
    }
}

export function validaFile(inputFile) {
    const tipoDeInput = inputFile.dataset.tipo;
    
    if(inputFile.validity.valid){
        inputFile.parentElement.classList.remove("input-container--invalid");
        inputFile.parentElement.querySelector(".input-message-error").innerHTML = "";
        
    } else {
        inputFile.parentElement.classList.add("input-container--invalid");
        console.log(inputFile.parentElement);
        inputFile.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, inputFile);
        
    }

}

function submitControler(inputs, button) {
    let count = 0;
    inputs.forEach(input => {
        if(!(input.validity.valid)){
            return;
        } 
            count++;
    });

    
    if(count == inputs.length){
        button.classList.remove("button-disabled");
        button.disabled = false;
        return;
    } 
        button.classList.add("button-disabled");
        button.disabled = true;
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch"
]

const mensajeDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacío",
        patternMismatch: "El nombre no es válido"
    },
    email: {
        valueMissing: "Este campo email no puede estar vacío",
        typeMismatch: "El correo no es válido",
        patternMismatch: "El correo no es válido"
    },
    asunto: {
        valueMissing: "Este campo asunto no puede estar vacío",
    },
    mensaje: {
        valueMissing: "Este campo mensaje no puede estar vacío",
    },
    password: {
        valueMissing: "El campo password no puede estar vacío",
        patternMismatch: "Entre 8 y 16 caracteres, al menos 1 mayúscula, 1 minúscula, 1 dígito, 1 carácter especial"
    },
    numero: {
        valueMissing: "El campo precio no puede estar vacío",
        patternMismatch: "El número puede ser entero, o tener como máximo dos decimales"
    },
    descripcion: {
        valueMissing: "El campo descripción no puede estar vacío",
    },
    archivo: {
        valueMissing: "Debe seleccionar una imagen",
    }
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        console.log(input.validity[error]);
        if(input.validity[error]){
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

