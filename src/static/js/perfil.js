import { getCookie } from "./globals/cookies.js";

document.querySelector(".edit-btn").addEventListener("click", openEditModal);
document.querySelector(".cancel-btn").addEventListener("click", closeEditModal);
document.querySelector(".save-btn").addEventListener("click", saveProfile);

function openEditModal() {
  document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

async function saveProfile() {
  const name = document.getElementById("editName").value.trim();
  const username = document.getElementById("editUsername").value.trim();
  const bio = document.getElementById("editBio").value.trim();

  if (!name || !username) {
    alert("Nome e nome de usuário são obrigatórios.");
    return;
  }

  /* ATUALIZAR TELA */
  document.getElementById("userName").textContent = name;
  document.getElementById("userUsername").textContent = "@" + username;
  document.getElementById("userBio").textContent = bio;

  /* ATUALIZAR AVATAR */
  document.getElementById("avatar").textContent = name.charAt(0).toUpperCase();

  try {
    const response = await fetch("/api/update-user-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        new_name: name,
        new_username: username,
        new_bio: bio,
        
        username: (await getCookie("usr")).value,
        token: (await getCookie("login_")).value
      })
    });
    const json = await response.json();

    cookieStore.set("usr", username);
    closeEditModal();
  }
  catch (err) {
    console.error(err);
  }
}

/* CARREGAR PERFIL */
function loadProfile() {
  const savedProfile = localStorage.getItem("estudaJuntoProfile");

  if (!savedProfile) {
    return;
  }

  try {
    const profile = JSON.parse(savedProfile);
    if (profile.name) {
      document.getElementById("userName").textContent = profile.name;
      document.getElementById("editName").value = profile.name;
      document.getElementById("avatar").textContent = profile.name.charAt(0).toUpperCase();
    }

    if (profile.username) {
      document.getElementById("userUsername").textContent = "@" + profile.username;
      document.getElementById("editUsername").value = profile.username;
    }

    if (profile.bio) {
      document.getElementById("userBio").textContent = profile.bio;
      document.getElementById("editBio").value = profile.bio;
    }
  }
  catch (error) {
    console.log("Não foi possível carregar o perfil.");
  }
}

function openDiscussion() {
  window.location.href = "discussao.html";
}

function logout() {
  const confirmation = confirm("Deseja realmente sair da sua conta?");
  if (!confirmation) {
    return;
  }

  localStorage.removeItem("estudaJuntoUser");
  sessionStorage.removeItem("estudaJuntoUser");

  window.location.href = "index.html";
}

/* PESQUISA */
document.getElementById("searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const search = this.value.trim();

    if (search)
      window.location.href = "index.html?busca=" + encodeURIComponent(search);
  }
});

/* FECHAR MODAL CLICANDO FORA */
document.getElementById("editModal").addEventListener("click", function (event) {
  if (event.target === this) {
    closeEditModal();
  }
});

window.addEventListener("DOMContentLoaded", loadProfile);

async function loadPublicData(query) {
  const avatar = document.querySelector("#avatar");
  const username = document.querySelector("#userName");
  const userUsername = document.querySelector("#userUsername");
  const bio = document.querySelector("#userBio");

  const edit_name = document.getElementById("editName").value.trim();
  const edit_username = document.getElementById("editUsername").value.trim();
  const edit_bio = document.getElementById("editBio").value.trim();

  try {
    const response = await fetch("/api/public-user-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: query })
    });
    const json = await response.json();

    avatar.innerText = json.name.charAt(0).toUpperCase();
    username.innerText = json.name;
    userUsername.innerText = json.username;
    bio.innerText = json.bio !== "" ? json.bio : "Ainda não foi fornecida uma BIO para essa conta.";

    edit_name = json.name;
    edit_username = json.username;
    edit_bio = json.bio;
  }
  catch (err) {
    console.error(err);
  }
}

(async function () {
  const usr = (await getCookie("usr"));
  const token = await getCookie("login_");

  if (!usr || !token) {
    location.href = "/login";
    return;
  }

  loadPublicData(usr.value);
  //avatar.innerText = usr.at(0);
  //username.innerText = usr;
  //userUsername.innerHTML = `@${usr}`;
})();