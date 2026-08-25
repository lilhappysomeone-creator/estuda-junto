import { setCookie } from "./globals/cookies.js";
import sender from "./globals/data-send.js";

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
document.querySelector("#registerForm").addEventListener("click", async function register(event) {
  event.preventDefault();
  hideMessages();

  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;

  if (name.length < 3) {
    showError("Digite seu nome completo.");
    return;
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    showError("O nome de usuário pode conter apenas letras, números e '_'.");
    return;
  }

  if (username.length < 3) {
    showError("O nome de usuário deve possuir pelo menos 3 caracteres.");
    return;
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!emailRegex.test(email)) {
    showError("Digite um e-mail válido.");
    return;
  }

  if (password.length < 6) {
    showError("A senha deve possuir pelo menos 6 caracteres.");
    return;
  }

  if (password !== confirmPassword) {
    showError("As senhas não são iguais.");
    return;
  }

  if (!terms) {
    showError("Você precisa aceitar os termos de uso.");
    return;
  }
  
  const newUser = {
    name: name,
    username: username,
    email: email,
    password: password,
    bio: "Estudante e participante do Estuda Junto."
  };

  document.querySelector(".register-button").disabled = true;
  try {
    const data = await sender.post("/api/create-user", newUser);
    console.log(data);

    await setCookie("usr", data.username);
    await setCookie("login_", data.login_token);
    
    showSuccess("Conta Criada! Você será redirecionado em instantes");
    setTimeout(() => location.href = "/", 3000);
  }
  catch (err) {
    console.error(err);
    showError(err.message);
    document.querySelector(".register-button").disabled = false;
  }
});

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