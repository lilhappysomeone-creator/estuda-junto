import { getCookie } from "./globals/cookies.js";
import sender from "./globals/data-send.js";

/* PUBLICAR DISCUSSÃO */
async function publishDiscussion() {
  // ...
  const username = await getCookie("usr");
  const token = await getCookie("login_");
  
  if (!username || !token) {
    alert("Você precisa está conectado para fazer uma discussão");
    return;
  }

  const title = document.getElementById("newTitle").value.trim();
  const category = document.getElementById("newCategory").value;
  const content = document.getElementById("newContent").value.trim();

  if (!title || !content) {
    alert("Preencha o título e o conteúdo.");
    return;
  }

  const discussionList = document.getElementById("discussionList");
  
  const DIV_newDiscussion = document.createElement("div");
  DIV_newDiscussion.className = "discussion";
  DIV_newDiscussion.dataset.category = category;
  DIV_newDiscussion.dataset.title = title;

  const H2_title = document.createElement("h2");
  H2_title.innerText = title;

  const P_content = document.createElement("p");
  P_content.innerHTML = content;

  const DIV_tags = document.createElement("div");
  DIV_tags.className = "tags";

  const SPAN_tag = document.createElement("span");
  SPAN_tag.innerText = category;

  const DIV_discussionInfo = document.createElement("div");
  DIV_discussionInfo.className = "discussion-info";
  DIV_discussionInfo.innerText = `👤 ${username.value} • 💬 0 comentários • 👍 0 curtidas • agora`;

  DIV_tags.appendChild(SPAN_tag);

  DIV_newDiscussion.appendChild(H2_title);
  DIV_newDiscussion.appendChild(P_content);
  DIV_newDiscussion.appendChild(DIV_tags);
  DIV_newDiscussion.appendChild(DIV_discussionInfo);
  
  DIV_newDiscussion.onclick = function () {
    openDiscussion(title, category, content);
  };

  discussionList.prepend(DIV_newDiscussion);
  document.getElementById("newTitle").value = "";
  document.getElementById("newContent").value = "";

  try {
    const data = await sender.post("/api/discussions/create", {
      username: username.value,
      token: token.value,
      discussion: {
        title: title,
        question: content
      }
    });

    console.log(data);
  }
  catch (err) {
    console.error(err);
  }

  document.getElementById("modal").style.display = "none";
  alert("Discussão publicada com sucesso!");
}

document.querySelector(".create-btn").addEventListener("click", function openModal() {
  document.getElementById("modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function closeModal() {
  document.getElementById("modal").style.display = "none";
});

document.querySelector(".publish-btn").addEventListener("click", publishDiscussion);

/* ABRIR DISCUSSÃO */
function openDiscussion(title, category, content) {
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

/*
<div class="discussion" data-category="História" data-title="A Revolta da Vacina" onclick="openDiscussion(
    'A Revolta da Vacina',
    'História',
    'A Revolta da Vacina aconteceu em 1904, no Rio de Janeiro. Quais foram os principais motivos que levaram a população a se revoltar contra a vacinação obrigatória?'
)">
<h2>A Revolta da Vacina: quais foram suas principais causas?</h2>
<p>
    Estou estudando a Revolta da Vacina e gostaria de entender
    melhor os motivos que levaram a população a se revoltar.
</p>

    <div class="tags">
        <span class="tag">História</span>
        <span class="tag">Brasil</span>
        <span class="tag">República Velha</span>
    </div>
    <div class="discussion-info">👤 João • 💬 18 comentários • 👍 32 curtidas • 2h atrás</div>
</div>
*/

async function getDiscussions() {
  const response = await fetch("/api/discussions/");
  const data = await response.json();
  
  for (const discussion of data) {
    const DIV_discussion = document.createElement("div");
    DIV_discussion.className = "discussion";
    
    const H2_title = document.createElement("h2");
    H2_title.innerText = discussion.title;

    const P_question = document.createElement("p");
    P_question.innerText = discussion.question;

    const DIV_tags = document.createElement("div");
    DIV_tags.className = "tags";

    for (const tag of discussion.tags) {
      const SPAN_tag = document.createElement("span");
      SPAN_tag.className = "tag";
      SPAN_tag.innerText = tag;

      DIV_tags.appendChild(SPAN_tag);
    }

    const DIV_info = document.createElement("div");
    DIV_info.className = "discussion-info";
    DIV_info.innerText = `${discussion.author} • ${discussion.comments} comentários • 👍 ${discussion.likes} curtidas • ${discussion.created_at}`;

    DIV_discussion.appendChild(H2_title);
    DIV_discussion.appendChild(P_question);
    DIV_discussion.appendChild(DIV_tags);
    DIV_discussion.appendChild(DIV_info);

    document.querySelector("div#discussionList").prepend(DIV_discussion);
  }
}

(async function() {
  const username = await getCookie("usr");
  const token    = await getCookie("login_");

  if (username && token)
    document.querySelector(".welcome h1").innerText = `Olá, ${username.value}! 👋`;

  getDiscussions();
})();