document.getElementById('configuracion-link').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace navegue a otra página
    var configuracionDiv = document.getElementById('configuracion');
        
    // Alternar la visibilidad de la sección de configuración
    if (configuracionDiv.style.display === 'none') {
        configuracionDiv.style.display = 'block';
    } else {
        configuracionDiv.style.display = 'none';
    }
});
