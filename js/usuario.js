const cardRegister = document.getElementById('card-register');
const cardLogin = document.getElementById('card-login');
const formRegister = document.getElementById('formRegister');
const formLogin = document.getElementById('formLogin');

function showLogin() {
    cardRegister.classList.add('hidden');
    cardLogin.classList.remove('hidden');
}

function showRegister() {
    cardLogin.classList.add('hidden');
    cardRegister.classList.remove('hidden');
}

function togglePass(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

formRegister.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if(email && pass) {
        localStorage.setItem('ecoUserEmail', email);
        localStorage.setItem('ecoUserPass', pass);

        alert('¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.');

        formRegister.reset();
        showLogin();
    } else {
        alert('Por favor completa todos los campos.');
    }
});

formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    const emailIngresado = document.getElementById('login-email').value;
    const passIngresado = document.getElementById('login-pass').value;

    const emailGuardado = localStorage.getItem('ecoUserEmail');
    const passGuardado = localStorage.getItem('ecoUserPass');

    if (emailGuardado && passGuardado) {
        if (emailIngresado === emailGuardado && passIngresado === passGuardado) {
            alert('Bienvenido a EcoByte, ' + emailIngresado);
            window.location.href = 'Nosotros.html';
        } else {
            alert('Correo o contraseña incorrectos.');
        }
    } 

    else {
        alert('Modo Demo: Bienvenido (Sin registro previo detectado).');
        window.location.href = 'Nosotros.html';
    }
});