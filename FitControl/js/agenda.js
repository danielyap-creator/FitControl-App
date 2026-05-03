// 🔒 trava de acesso (ADMIN)
const tipoUsuario = localStorage.getItem("tipoUsuario");

if (tipoUsuario !== "admin") {
  alert("Acesso permitido apenas para administradores.");
  window.location.href = "index.html";
}

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sidebar = document.getElementById("sidebar");

if (openMenu) {
  openMenu.addEventListener("click", () => {
    sidebar.classList.add("show");
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });
}