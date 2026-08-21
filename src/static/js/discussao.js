/* CURTIR DISCUSSÃO */

function likeDiscussion() {
  const button = document.getElementById("likeButton");
  const count = document.getElementById("likeCount");
  let likes = parseInt(count.textContent);

  if (button.classList.contains("active")) {
    likes--;
    button.classList.remove("active");
  }
  else {
    likes++;
    button.classList.add("active");
  }

  count.textContent = likes;
}

/* CURTIR COMENTÁRIO */
function likeComment(button) {
  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
    button.textContent = "👍 Curtir";
  } else {
    button.classList.add("liked");
    button.textContent = "👍 Curtido";
  }
}

/* MOSTRAR RESPOSTA */
function showReply(button) {
  const comment = button.closest(".comment");
  const replyBox = comment.querySelector(".reply-box");

  if (replyBox.style.display === "block") {
    replyBox.style.display = "none";
  }
  else {
    replyBox.style.display = "block";
    replyBox.querySelector("textarea").focus();
  }
}

/* ENVIAR RESPOSTA */
function sendReply(button) {
  const replyBox = button.closest(".reply-box");
  const textarea = replyBox.querySelector("textarea");
  const text = textarea.value.trim();

  if (!text) {
    alert("Digite uma resposta.");
    return;
  }

  const reply = document.createElement("div");
  
  reply.style.marginTop = "15px";
  reply.style.marginLeft = "46px";
  reply.style.padding = "12px";
  reply.style.background = "#f1f5f9";
  reply.style.borderRadius = "8px";

  reply.innerHTML = `
            <strong>
                Você
            </strong>
            <span style="color:#888; font-size:12px; margin-left:8px;">agora</span>
            <p style="margin-top:7px; color:#555; line-height:1.5;">${escapeHTML(text)}</p>
  `;

  replyBox.parentElement.appendChild(reply);
  textarea.value = "";
  replyBox.style.display = "none";
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
                <div class="avatar">V</div>

                <div class="comment-author">
                    <strong>Você</strong>
                    <span class="comment-date">agora</span>
                </div>
            </div>

            <div class="comment-text">${escapeHTML(text)}</div>
            <div class="comment-actions">
                <button onclick="likeComment(this)">👍 Curtir</button>
                <button onclick="showReply(this)">↩ Responder</button>
            </div>

            <div class="reply-box">
                <textarea placeholder="Escreva sua resposta..."></textarea>
                <button onclick="sendReply(this)">Responder</button>
            </div>
        `;

  const newComment = document.querySelector(".new-comment");

  document.querySelector(".comments-section").insertBefore(comment, newComment);
  input.value = "";

  const count = document.getElementById("commentCount");
  count.textContent = parseInt(count.textContent) + 1;
}

/* COMPARTILHAR */
function shareDiscussion() {
  if (navigator.share) {
    navigator.share({
      title: "A Revolta da Vacina",
      text: "Confira esta discussão no Estuda Junto!",
      url: window.location.href
    });
  }
  else {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copiado!");
  }
}

/* DENUNCIAR */
function reportDiscussion() {
  const reason = prompt("Por que você deseja denunciar esta discussão?");

  if (reason && reason.trim()) {
    alert("Obrigado. Sua denúncia foi registrada para análise.");
  }
}

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
      if (search) {
        window.location.href = `index.html?busca=${encodeURIComponent(search)}`
      }
    }
});