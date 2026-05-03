const formEsqueciSenha = document.getElementById("formEsqueciSenha");

formEsqueciSenha.addEventListener("submit", function(event) {
    event.preventDefault();

    const emailDigitado = document.getElementById("emailRecuperacao").value;
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(usuario => usuario.email === emailDigitado);

    if (usuarioEncontrado) {
        alert("Sua senha cadastrada é: " + usuarioEncontrado.senha);
        window.location.href = "index.html";
    } else {
        alert("E-mail não encontrado. Verifique ou faça um cadastro.");
    }
});