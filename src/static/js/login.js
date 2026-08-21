/* LOGIN */
async function login(event) {
  // TODO: implementar 'lembrar de mim'

  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;
  const error = document.getElementById("errorMessage");
  const success = document.getElementById("successMessage");

  error.style.display = "none";
  success.style.display = "none";

  if (!email || !password) {
    showError("Preencha todos os campos.");
    return;
  }

  if (!email.includes("@")) {
    showError("Digite um e-mail válido.");
    return;
  }

  if (password.length < 6) {
    showError("A senha deve possuir pelo menos 6 caracteres.");
    return;
  }

  const user = {
    email,
    password
  };

  await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(dat => {
    if (dat.status !== 202)
        throw { message: dat.message };

    cookieStore.set("usr", dat.username);
    cookieStore.set("login_", dat.login_token);
    showSuccess("Contra Criada! Você será redirecionado em instantes");
    setTimeout(() => location.href = "/", 3000);
  })
  .catch(err => {
    console.error(err);
    showError(err.message);
  });
}

/* ERRO */
function showError(message) {
  const error = document.getElementById("errorMessage");

  error.textContent = message;
  error.style.display = "block";
}

/* SUCESSO */
function showSuccess(message) {
  const success = document.getElementById("successMessage");

  success.textContent = message;
  success.style.display = "block";
}

/* ESQUECI A SENHA */
function forgotPassword() {
  const email = prompt("Digite seu e-mail para recuperar sua senha:");
  if (!email)
    return;

  if (!email.includes("@")) {
    alert("Digite um e-mail válido.");
    return;
  }

  alert(`Em uma versão conectada ao servidor, um link de recuperação seria enviado para ${email},`);
}

/* VERIFICAR SE JÁ ESTÁ LOGADO */
window.addEventListener("DOMContentLoaded", async function () {
  const username = await cookieStore.get("usr");
  const token    = await cookieStore.get("login_");

  if (username && token)
    location.href = "/";
});