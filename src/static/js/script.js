function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* PUBLICAR DISCUSSÃO */
function publishDiscussion() {
  const title = document.getElementById("newTitle").value.trim();
  const category = document.getElementById("newCategory").value;
  const content = document.getElementById("newContent").value.trim();

  if (!title || !content) {
    alert("Preencha o título e o conteúdo.");
    return;
  }

  const discussionList = document.getElementById("discussionList");
  const newDiscussion = document.createElement("div");

  newDiscussion.className = "discussion";
  newDiscussion.dataset.category = category;
  newDiscussion.dataset.title = title;

  newDiscussion.innerHTML = `
            <h2>${escapeHTML(title)}</h2>
            <p>
                ${escapeHTML(content)}
            </p>

            <div class="tags">
                <span class="tag">
                    ${escapeHTML(category)}
                </span>
            </div>

            <div class="discussion-info">
                👤 Você • 💬 0 comentários • 👍 0 curtidas • agora
            </div>
        `;

  newDiscussion.onclick = function () {
    openDiscussion(
      title,
      category,
      content
    );

  };

  discussionList.prepend(newDiscussion);
  document.getElementById("newTitle").value = "";
  document.getElementById("newContent").value = "";

  closeModal();
  alert("Discussão publicada com sucesso!");

}

/* ABRIR DISCUSSÃO */
function openDiscussion(
  title,
  category,
  content
) {

  document.getElementById("homePage").style.display = "none";
  document.getElementById("discussionPage").style.display = "block";
  document.getElementById("discussionTitle").textContent = title;
  document.getElementById("discussionCategory").textContent = category;
  document.getElementById("discussionContent").textContent = content;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

/* VOLTAR */
function backHome() {
  document.getElementById("discussionPage").style.display = "none";
  document.getElementById("homePage").style.display = "block";
}

/* ADICIONAR COMENTÁRIO */
function addComment() {
  const input = document.getElementById("commentInput");
  const text = input.value.trim();

  if (!text) {
    alert("Digite um comentário.");
    return;
  }

  const comment = document.createElement("div");
  comment.className = "comment";
  comment.innerHTML = `
            <div class="comment-header">
                <div class="avatar">
                    V
                </div>
                <strong>Você</strong>
            </div>
            <p>
                ${escapeHTML(text)}
            </p>

        `;

  document.getElementById("comments").appendChild(comment);
  input.value = "";
}

/* PESQUISA */
function searchDiscussions() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const discussions = document.querySelectorAll(".discussion");

  discussions.forEach(function (discussion) {
    const title = discussion.dataset.title.toLowerCase();
    const text = discussion.innerText.toLowerCase();

    if (title.includes(search) || text.includes(search)) {
      discussion.style.display = "block";
    } else {
      discussion.style.display = "none";
    }
  });
}

/* FILTRAR CATEGORIA */
function filterCategory(category) {
  const discussions = document.querySelectorAll(".discussion");

  discussions.forEach(function (discussion) {
    if (category === "Todas" || discussion.dataset.category === category) {
      discussion.style.display = "block";
    } else {
      discussion.style.display = "none";
    }
  });
}

/* PROTEÇÃO CONTRA HTML INJETADO */
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* FECHAR MODAL CLICANDO FORA */
window.onclick = function (event) {
  const modal = document.getElementById("modal");

  if (event.target === modal) {
    closeModal();
  }
};