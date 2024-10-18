document.addEventListener('DOMContentLoaded', function () {
  const userIcon = document.getElementById('user-icon');
  const userPopup = document.getElementById('user-popup');

  userIcon.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevenir que el clic también cierre el popup
    userPopup.classList.toggle('show');
  });

  // Cerrar el popup al hacer clic fuera de él
  window.addEventListener('click', function (event) {
    if (!userIcon.contains(event.target) && !userPopup.contains(event.target)) {
      userPopup.classList.remove('show');
    }
  });
});
