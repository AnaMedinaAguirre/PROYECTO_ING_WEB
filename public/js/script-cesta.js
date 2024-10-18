// Función para cargar el carrito desde localStorage y mostrar los cursos
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Recuperar el carrito de localStorage
    const cartContent = document.getElementById('cart-content');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    let totalAmount = 0;

    // Mostrar el número de cursos en el carrito
    cartCount.innerText = `${cart.length} cursos en la cesta`;

    // Limpiar el contenido anterior
    cartContent.innerHTML = '';

    // Recorrer los cursos y mostrarlos
    cart.forEach((course, index) => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('cart-item');
        courseElement.innerHTML = `
            <img src="${course.image}" alt="${course.name}">
            <div class="cart-item-details">
                <h3>${course.name}</h3>
                <p>${course.price} S/</p>
            </div>
            <div class="cart-item-actions">
                <span>${course.price} S/</span>
                <a href="#" onclick="removeFromCart(${index})">Eliminar</a>
            </div>
        `;

        cartContent.appendChild(courseElement);

        // Sumar el precio al total
        totalAmount += parseFloat(course.price);
    });

    // Mostrar el total en la cesta
    cartTotal.innerText = `${totalAmount.toFixed(2)} S/`;
}

// Función para eliminar un curso del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Eliminar el curso del carrito
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito actualizado
    loadCart(); // Recargar el carrito
}

// Cargar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', loadCart);