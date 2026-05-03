const tipoUsuario = localStorage.getItem("tipoUsuario");

if (tipoUsuario !== "aluno") {
  alert("Acesso permitido apenas para alunos.");
  window.location.href = "index.html";
}

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sidebar = document.getElementById("sidebar");
const nomeUsuario = document.getElementById("nomeUsuario");
const planoAtual = document.getElementById("planoAtual");
const tabelaPlano = document.getElementById("tabelaPlano");
const valorPlano = document.getElementById("valorPlano");

if (openMenu) openMenu.addEventListener("click", () => sidebar.classList.add("show"));
if (closeMenu) closeMenu.addEventListener("click", () => sidebar.classList.remove("show"));

const nomeLogado = localStorage.getItem("usuarioLogado");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
garantirPlanosPadrao();

const usuario = usuarios.find(user => user.nome === nomeLogado || user.email === nomeLogado);
const aluno = usuario?.idAluno
  ? alunos.find(item => String(item.idAluno) === String(usuario.idAluno))
  : alunos.find(item => item.email === usuario?.email || item.nome === nomeLogado);

if (usuario && nomeUsuario) nomeUsuario.textContent = usuario.nome;

if (aluno) {
  const matriculaAtiva = matriculas.find(m => String(m.idAluno) === String(aluno.idAluno) && m.status === "Ativa");

  if (matriculaAtiva) {
    const plano = planoPorId(matriculaAtiva.idPlano);
    planoAtual.textContent = plano?.nome || "Plano não encontrado";
    valorPlano.textContent = plano ? formatarMoeda(plano.valor) : "-";

    tabelaPlano.innerHTML = `
      <tr>
        <td>${plano?.nome || "-"}</td>
        <td>${plano?.duracao || "-"}</td>
        <td>Academia e aulas</td>
        <td>${matriculaAtiva.status}</td>
      </tr>
    `;
  } else {
    planoAtual.textContent = "Sem matrícula";
    valorPlano.textContent = "-";
    tabelaPlano.innerHTML = `<tr><td colspan="4">Nenhuma matrícula ativa encontrada.</td></tr>`;
  }
}
