/* FORÇA DA SENHA */
document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  const bar = document.getElementById("strengthBar");
  const text = document.getElementById("strengthText");
  let strength = 0;

  if (password.length >= 6)
    strength++;

  if (password.length >= 10)
    strength++;

  if (/[A-Z]/.test(password))
    strength++;

  if (/[0-9]/.test(password))
    strength++;

  if (/[^A-Za-z0-9]/.test(password))
    strength++;

  if (!password) {
    bar.style.width = "0%";
    text.textContent = "Digite uma senha.";
  }
  else if (strength <= 2) {
    bar.style.width = "35%";
    text.textContent = "Senha fraca.";
  }
  else if (strength <= 4) {
    bar.style.width = "70%";
    text.textContent = "Senha média.";
  }
  else {
    bar.style.width = "100%";
    text.textContent = "Senha forte.";
  }
});

/* CADASTRO */
function register(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;

  /* LIMPAR MENSAGENS */
  hideMessages();

  /* VALIDAR NOME */
  if (name.length < 3) {
    showError("Digite seu nome completo.");
    return;
  }

  /* VALIDAR USUÁRIO */
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    showError("O nome de usuário pode conter apenas letras, números e '_'.");
    return;
  }

  if (username.length < 3) {
    showError("O nome de usuário deve possuir pelo menos 3 caracteres.");
    return;
  }

  /* VALIDAR EMAIL */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError("Digite um e-mail válido.");
    return;
  }

  /* VALIDAR SENHA */
  if (password.length < 6) {
    showError("A senha deve possuir pelo menos 6 caracteres.");
    return;
  }

  /* CONFIRMAR SENHA */
  if (password !== confirmPassword) {
    showError("As senhas não são iguais.");
    return;
  }

  /* TERMOS */
  if (!terms) {
    showError("Você precisa aceitar os termos de uso.");
    return;
  }

  /* VERIFICAR USUÁRIOS SALVOS */
  let users = JSON.parse(localStorage.getItem("estudaJuntoUsers")) || [];
  const existingEmail = users.find(user => user.email === email);

  if (existingEmail) {
    showError("Este e-mail já está cadastrado.");
    return;
  }

  const existingUsername = users.find(user => user.username === username);
  if (existingUsername) {
    showError("Este nome de usuário já está sendo utilizado.");
    return;
  }

  /*
      CRIAR USUÁRIO

      IMPORTANTE:
      Isto é apenas para o protótipo.
      Em uma aplicação real, a senha
      NÃO deve ser armazenada dessa forma.
  */
  const newUser = {
    id: Date.now(),
    name: name,
    username: username,
    email: email,
    password: password,
    bio: "Estudante e participante do Estuda Junto.",
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem("estudaJuntoUsers", JSON.stringify(users));

  /* SALVAR PERFIL ATUAL*/
  localStorage.setItem("estudaJuntoProfile", JSON.stringify({
    name: name,
    username: username,
    bio: "Estudante e participante do Estuda Junto."
  }));

  /* SUCESSO */
  showSuccess("Conta criada com sucesso! Redirecionando para o login...");
  document.getElementById("registerForm").reset();

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1500);
}

/* ERRO */
function showError(message) {
  const element = document.getElementById("errorMessage");

  element.textContent = message;
  element.style.display = "block";
}

/* SUCESSO */
function showSuccess(message) {
  const element = document.getElementById("successMessage");

  element.textContent = message;
  element.style.display = "block";
}

/* ESCONDER MENSAGENS */
function hideMessages() {
  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("successMessage").style.display = "none";
}

/* TERMOS */
function showTerms(event) {
  event.preventDefault();

  alert(
    "Termos de uso do Estuda Junto:\n\n" +

    "A plataforma tem como objetivo permitir " +
    "que estudantes compartilhem conhecimentos " +
    "e participem de discussões educativas.\n\n" +

    "Os usuários devem respeitar os demais " +
    "participantes e não publicar conteúdo " +
    "ofensivo, ilegal ou inadequado."
  );
}