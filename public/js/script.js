document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const dateOfBirth = document.getElementById('date').value;
    const address = document.getElementById('text').value;

    // Verifica si todos los datos están correctos
    console.log('Nombre:', firstName);
    console.log('Apellido:', lastName);
    console.log('Teléfono:', phone);
    console.log('Nombre de usuario:', username);
    console.log('Contraseña:', password);
    console.log('Fecha de nacimiento:', dateOfBirth);
    console.log('Dirección:', address);

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username, 
                password, 
                firstName, 
                lastName, 
                phone,
                dateOfBirth,
                address
            }),
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (data.message) {
            alert(data.message); // Muestra un mensaje de éxito o error al usuario
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});



document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    console.log(data);
    if (data.message === 'Inicio de sesión exitoso') {
        alert('Login exitoso');
        window.location.href = '/html/principal.html';
    } else {
        alert('Login fallido: ' + data.message);
    }
});

// Lógica para mostrar/ocultar el form
document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
});

document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
});

document.getElementById('googleLogin').addEventListener('click', function() {
    window.location.href = '/auth/google'; // Redirige a lo de Google
});
