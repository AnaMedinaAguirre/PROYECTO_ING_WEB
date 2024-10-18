document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos
    const categoryButtons = document.querySelectorAll('.category-button');
    const courses = document.querySelectorAll('.card-product');
    const cartIcon = document.getElementById('cart-icon');
    const cartPopup = document.getElementById('cart-popup');
    const cartText = document.querySelector('.content-shopping-cart .text');
    const cartNumber = document.querySelector('.container-user .number');
    
    let cartCount = 0; // Contador de productos en el carrito
    const cartItems = []; // Arreglo para almacenar los cursos en el carrito
    let totalPrice = 0; // Total acumulado de los cursos en el carrito

    // Funciones

    // Función para agregar productos al carrito
    // Guardar en localStorage al añadir al carrito
    function addToCart(course) {
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener el carrito de localStorage o crear uno nuevo
        cart.push(course); // Añadir el curso al carrito
        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito actualizado en localStorage

        // Actualizar el contador en el header (ya implementado)
        cartCount++; 
        cartItems.push(course); // Agregar el curso al arreglo
        totalPrice += course.price; // Sumar el precio al total
        const cartNumber = document.querySelector('.container-user .number');
        cartNumber.innerText = `(${cartCount})`;

        // Mostrar el mensaje emergente (ya implementado)
        showMessage(`${course.name} ha sido añadido al carrito`);
    }

    // Función para mostrar un mensaje emergente
    function showMessage(message) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'message-popup';
        messageContainer.innerText = message;
        document.body.appendChild(messageContainer);

        // Estilo del mensaje emergente
        messageContainer.style.position = 'fixed';
        messageContainer.style.bottom = '20px';
        messageContainer.style.right = '20px';
        messageContainer.style.backgroundColor = '#d4d4d4'; // Usar tu paleta de colores
        messageContainer.style.color = '#000';
        messageContainer.style.padding = '10px 20px';
        messageContainer.style.borderRadius = '5px';
        messageContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        messageContainer.style.zIndex = '1000';

        // Remover el mensaje después de 3 segundos
        setTimeout(() => {
            document.body.removeChild(messageContainer);
        }, 3000);
    }

    // Función para llenar el popup del carrito
    function fillCartPopup() {
        cartPopup.innerHTML = ''; // Limpiar contenido previo
        cartItems.forEach(course => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${course.image}" alt="${course.name}" />
                <span>${course.name} - $${course.price.toFixed(2)}</span>
            `;
            cartPopup.appendChild(cartItem);
        });
        
        // Mostrar el total
        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
        cartPopup.appendChild(totalElement);

        // Crear y agregar el botón "Ir a la cesta"
        const goToCartButton = document.createElement('button');
        goToCartButton.innerText = 'Ir a la cesta';
        goToCartButton.className = 'go-to-cart-button'; // Clase para estilo
        goToCartButton.onclick = () => {
            window.location.href = '../html/cesta.html'; // Cambia esto a la URL de tu cesta
        };
        cartPopup.appendChild(goToCartButton);

        cartPopup.style.display = 'block'; // Mostrar el popup
    }

    // Manejo de eventos

    // Eventos de los botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Mostrar todos los cursos o solo los que pertenecen a la categoría seleccionada
            courses.forEach(course => {
                course.style.display = (category === 'all' || course.getAttribute('data-category') === category) ? 'block' : 'none';
            });

            // Remover la clase active de todos los botones
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar la clase active al botón clicado
            button.classList.add('active');
        });
    });

    // Agregar el evento a los iconos de añadir al carrito
    const addCartIcons = document.querySelectorAll('.add-cart');
    addCartIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            // Encontrar el contenedor del curso correspondiente
            const cardProductElement = event.currentTarget.closest('.card-product');

            // Obtener los datos del curso
            const courseName = cardProductElement.querySelector('h3').innerText; // Toma el nombre del curso
            const courseImage = cardProductElement.querySelector('img').src; // Toma la imagen del curso
            const coursePrice = parseFloat(cardProductElement.querySelector('.price').innerText.replace('$', '').trim()); // Toma el precio del curso

            // Añadir el curso al carrito
            addToCart({
                name: courseName,
                image: courseImage,
                price: coursePrice // Añadir el precio
            });
        });
    });

    // Mostrar el popup del carrito al pasar el mouse
    cartIcon.addEventListener('mouseenter', () => {
        if (cartItems.length > 0) {
            fillCartPopup(); // Llenar el popup
        }
    });

    // Ocultar el popup del carrito al salir el mouse
    cartIcon.addEventListener('mouseleave', () => {
        cartPopup.style.display = 'none'; // Ocultar el popup
    });

    // Mostrar el popup al pasar el mouse sobre el texto del carrito
    cartText.addEventListener('mouseenter', () => {
        if (cartItems.length > 0) {
            fillCartPopup(); // Llenar el popup
        }
    });

    // No ocultar el popup al salir el mouse del popup o del botón
    cartPopup.addEventListener('mouseenter', () => {
        cartPopup.style.display = 'block'; // Mantener visible
    });
    
    cartPopup.addEventListener('mouseleave', () => {
        cartPopup.style.display = 'none'; // Ocultar el popup
    });

    // Ocultar el popup del carrito al salir el mouse
    cartText.addEventListener('mouseleave', () => {
        cartPopup.style.display = 'none'; // Ocultar el popup
    });
});
