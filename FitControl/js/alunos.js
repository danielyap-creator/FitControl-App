const tipoUsuario = localStorage.getItem("tipoUsuario");

if (tipoUsuario !== "admin") {
  alert("Acesso permitido apenas para administradores.");
  window.location.href = "index.html";
}

const formAluno = document.getElementById("formAluno");
const listaAlunos = document.getElementById("listaAlunos");
const openMenuAluno = document.getElementById("openMenu");
const closeMenuAluno = document.getElementById("closeMenu");
const sidebarAluno = document.getElementById("sidebar");

if (openMenuAluno) openMenuAluno.addEventListener("click", () => sidebarAluno.classList.add("show"));
if (closeMenuAluno) closeMenuAluno.addEventListener("click", () => sidebarAluno.classList.remove("show"));

function carregarAlunos() {
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  if (!listaAlunos) return;

  if (alunos.length === 0) {
    listaAlunos.innerHTML = `<tr><td colspan="4">Nenhum aluno cadastrado.</td></tr>`;
    return;
  }

  listaAlunos.innerHTML = alunos.map(aluno => `
    <tr>
      <td>${aluno.nome}</td>
      <td>${aluno.email}</td>
      <td>${aluno.telefone}</td>
      <td>${aluno.cpf}</td>
    </tr>
  `).join("");
}

if (formAluno) {
  formAluno.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const endereco = document.getElementById("endereco").value.trim();

    if (!nome || !cpf || !email || !telefone || !dataNascimento || !endereco) {
      alert("Preencha todos os campos.");
      return;
    }

    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    const alunoExistente = alunos.find(aluno => aluno.cpf === cpf || aluno.email === email);

    if (alunoExistente) {
      alert("Aluno já cadastrado com este CPF ou e-mail.");
      return;
    }

    const novoAluno = {
      idAluno: Date.now(),
      nome,
      cpf,
      email,
      telefone,
      dataNascimento,
      endereco
    };

    alunos.push(novoAluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioJaExiste = usuarios.find(user => user.email === email);

    if (!usuarioJaExiste) {
      usuarios.push({
        idUsuario: Date.now() + 1,
        nome,
        usuario: email,
        email,
        senha: "123456",
        tipo: "aluno",
        idAluno: novoAluno.idAluno
      });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    alert("Aluno cadastrado com sucesso! Agora faça a matrícula do aluno na tela Matrículas.");
    formAluno.reset();
    carregarAlunos();
  });
}

carregarAlunos();
