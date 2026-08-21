/* LOGIN */
function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;
  const error = document.getElementById("errorMessage");
  const success = document.getElementById("successMessage");

  error.style.display = "none";
  success.style.display = "none";

  /* VALIDAÇÃO */
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

  /*
      LOGIN TEMPORÁRIO

      Nesta versão somente frontend,
      estamos simulando o login.

      Quando o backend Node.js + MySQL
      estiver conectado, esta parte será
      substituída por uma requisição à API.
  */

  const user = {
    email: email,
    loggedIn: true,
    loginDate: new Date().toISOString()
  };

  if (remember) {
    localStorage.setItem("estudaJuntoUser", JSON.stringify(user));
  } else {
    sessionStorage.setItem("estudaJuntoUser", JSON.stringify(user));
  }

  showSuccess("Login realizado com sucesso! Redirecionando...");

  setTimeout(function () {
    window.location.href = "index.html";
  }, 1200);
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
window.addEventListener("DOMContentLoaded", function () {
  const localUser = localStorage.getItem("estudaJuntoUser");

  if (localUser) {
    /*
        Não redirecionamos automaticamente
        para evitar prender o usuário na página.
    */
    // HAHAI
  }
});