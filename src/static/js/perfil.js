// Código duplicado
function openEditModal() {
  document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

function saveProfile() {
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

  /* SALVAR LOCALMENTE */
  const profile = {
    name: name,
    username: username,
    bio: bio
  };

  localStorage.setItem("estudaJuntoProfile", JSON.stringify(profile));

  closeEditModal();
  alert("Perfil atualizado com sucesso!");
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
      document.getElementById("avatar").textContent =profile.name.charAt(0).toUpperCase();
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