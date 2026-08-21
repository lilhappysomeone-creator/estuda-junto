/* ARRAY DE TAGS */
let tags = [];

/* ADICIONAR TAG */
function addTag() {
  const input = document.getElementById("tagInput");
  const tag = input.value.trim();

  if (!tag) {
    alert("Digite uma tag.");
    return;
  }

  if (tags.includes(tag)) {
    alert("Essa tag já foi adicionada.");
    return;
  }

  if (tags.length >= 5) {
    alert("Você pode adicionar no máximo 5 tags.");
    return;
  }

  tags.push(tag);
  input.value = "";
  renderTags();
}

/* MOSTRAR TAGS */
function renderTags() {
  const list = document.getElementById("tagsList");
  list.innerHTML = "";

  tags.forEach(function (tag, index) {
    const element = document.createElement("span");
    element.className = "tag";
    element.innerHTML = `
                ${escapeHTML(tag)}
                <span class="remove-tag" onclick="removeTag(${index})">×</span>
    `;

    list.appendChild(element);
  });
}

/* REMOVER TAG */
function removeTag(index) {
  tags.splice(index, 1);
  renderTags();
}

/* ENTER PARA ADICIONAR TAG */
document.getElementById("tagInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTag();
  }
});

/* PUBLICAR */
function publishDiscussion() {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value.trim();
  const allowComments = document.getElementById("allowComments").checked;
  const notifyReplies = document.getElementById("notifyReplies").checked;

  /* VALIDAÇÕES */
  if (!title) {
    alert("Digite um título para a discussão.");
    document.getElementById("title").focus();
    return;
  }

  if (title.length < 5) {
    alert("O título deve possuir pelo menos 5 caracteres.");
    return;
  }

  if (!category) {
    alert("Selecione uma categoria.");
    return;
  }

  if (!content) {
    alert("Digite o conteúdo da discussão.");
    document.getElementById("content").focus();
    return;
  }

  if (content.length < 20) {
    alert("O conteúdo deve possuir pelo menos 20 caracteres.");
    return;
  }

  /*
      POR ENQUANTO, OS DADOS FICAM
      APENAS NO NAVEGADOR.
  */
  const discussion = {
    title: title,
    category: category,
    tags: tags,
    content: content,
    allowComments: allowComments,
    notifyReplies: notifyReplies,
    author: "Você",
    date: new Date().toLocaleString("pt-BR")
  };

  /*
      SALVA NO LOCALSTORAGE
      PARA PODER SER RECUPERADO PELO
      JAVASCRIPT DE OUTRAS PÁGINAS.
  */
  let discussions = JSON.parse(localStorage.getItem("estudaJuntoDiscussions")) || [];
  discussions.unshift(discussion);

  localStorage.setItem("estudaJuntoDiscussions", JSON.stringify(discussions));

  alert("Discussão publicada com sucesso!");
  /*
      VOLTA PARA A PÁGINA INICIAL
  */
  window.location.href = "index.html";
}

/* CANCELAR */
function cancelDiscussion() {
  const confirmation = confirm("Deseja cancelar? Os dados preenchidos serão perdidos.");
  if (confirmation) {
    window.location.href = "index.html";
  }
}

/* PRÉ-VISUALIZAÇÃO */
function updatePreview() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const preview = document.getElementById("preview");

  if (!title && !content) {
    preview.style.display = "none";
    return;
  }

  preview.style.display = "block";
  
  document.getElementById("previewTitle").textContent = title || "Título da discussão";
  document.getElementById("previewContent").textContent = content || "Conteúdo da discussão";

  const previewTags = document.getElementById("previewTags");
  previewTags.innerHTML = "";

  tags.forEach(function (tag) {
    const element = document.createElement("span");
    element.className = "tag";
    element.textContent = tag;

    previewTags.appendChild(element);
  });
}

/* ATUALIZAR PREVIEW */
document.getElementById("title").addEventListener("input", updatePreview);
document.getElementById("content").addEventListener("input", updatePreview);

/* ATUALIZAR PREVIEW APÓS TAG */
const originalRenderTags = renderTags;
renderTags = function () {
  originalRenderTags();
  updatePreview();
};

/* PROTEÇÃO CONTRA HTML */
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* PESQUISA */
document.getElementById("searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const search = this.value.trim();

    if (search)
      window.location.href = `index.html?busca=${encodeURIComponent(search)}`;
  }
});