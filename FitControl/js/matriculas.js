const tipoUsuario = localStorage.getItem("tipoUsuario");
if (tipoUsuario !== "admin") {
  alert("Acesso permitido apenas para administradores.");
  window.location.href = "index.html";
}

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sidebar = document.getElementById("sidebar");
const formMatricula = document.getElementById("formMatricula");
const listaMatriculas = document.getElementById("listaMatriculas");
const alunoSelect = document.getElementById("alunoMatricula");
const planoSelect = document.getElementById("planoMatricula");

if (openMenu) openMenu.addEventListener("click", () => sidebar.classList.add("show"));
if (closeMenu) closeMenu.addEventListener("click", () => sidebar.classList.remove("show"));

function carregarSelects() {
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  const planos = garantirPlanosPadrao();

  alunoSelect.innerHTML = `<option value="">Selecione o aluno</option>`;
  alunos.forEach(aluno => alunoSelect.innerHTML += `<option value="${aluno.idAluno}">${aluno.nome}</option>`);

  planoSelect.innerHTML = `<option value="">Selecione o plano</option>`;
  planos.forEach(plano => planoSelect.innerHTML += `<option value="${plano.idPlano}">${plano.nome} - ${formatarMoeda(plano.valor)}</option>`);
}

function carregarMatriculas() {
  const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
  if (matriculas.length === 0) {
    listaMatriculas.innerHTML = `<tr><td colspan="5">Nenhuma matrícula cadastrada.</td></tr>`;
    return;
  }

  listaMatriculas.innerHTML = matriculas.map(matricula => {
    const plano = planoPorId(matricula.idPlano);
    return `
      <tr>
        <td>${nomeAlunoPorId(matricula.idAluno)}</td>
        <td>${plano?.nome || "Plano não encontrado"}</td>
        <td>${formatarDataBR(matricula.dataInicio)}</td>
        <td>${formatarDataBR(matricula.dataFim)}</td>
        <td class="${matricula.status === "Ativa" ? "active" : "inactive"}">${matricula.status}</td>
      </tr>
    `;
  }).join("");
}

if (formMatricula) {
  formMatricula.addEventListener("submit", function(event) {
    event.preventDefault();

    const idAluno = alunoSelect.value;
    const idPlano = planoSelect.value;
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;
    const status = document.getElementById("statusMatricula").value;

    const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
    matriculas.push({ idMatricula: Date.now(), idAluno, idPlano, dataInicio, dataFim, status });
    localStorage.setItem("matriculas", JSON.stringify(matriculas));

    alert("Matrícula cadastrada com sucesso!");
    formMatricula.reset();
    carregarMatriculas();
  });
}

carregarSelects();
carregarMatriculas();
