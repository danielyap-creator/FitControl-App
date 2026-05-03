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

const matriculasCtx = document.getElementById("matriculasChart");
if (matriculasCtx) {
  new Chart(matriculasCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      datasets: [{
        label: "Matrículas",
        data: [180, 195, 210, 225, 248, 265],
        borderWidth: 3,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });
}

const planosCtx = document.getElementById("planosChart");
if (planosCtx) {
  new Chart(planosCtx, {
    type: "bar",
    data: {
      labels: ["Mensal", "Trimestral", "Semestral", "Anual"],
      datasets: [{
        label: "Planos vendidos",
        data: [45, 30, 15, 10],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });
}