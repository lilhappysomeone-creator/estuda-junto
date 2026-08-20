/* =========================================================
   ESTUDA JUNTO
   SCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES
   ========================================================= */

const STORAGE_USERS = "estudaJuntoUsers";
const STORAGE_USER = "estudaJuntoUser";
const STORAGE_PROFILE = "estudaJuntoProfile";
const STORAGE_DISCUSSIONS = "estudaJuntoDiscussions";


/* =========================================================
   FUNÇÕES DE LOCALSTORAGE
   ========================================================= */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(STORAGE_USERS)
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveUsers(users) {

    localStorage.setItem(
        STORAGE_USERS,
        JSON.stringify(users)
    );

}


function getDiscussions() {

    try {

        return JSON.parse(
            localStorage.getItem(STORAGE_DISCUSSIONS)
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveDiscussions(discussions) {

    localStorage.setItem(
        STORAGE_DISCUSSIONS,
        JSON.stringify(discussions)
    );

}


/* =========================================================
   USUÁRIO LOGADO
   ========================================================= */

function getLoggedUser() {

    try {

        const localUser =
            localStorage.getItem(STORAGE_USER);

        if (localUser) {

            return JSON.parse(localUser);

        }


        const sessionUser =
            sessionStorage.getItem(STORAGE_USER);

        if (sessionUser) {

            return JSON.parse(sessionUser);

        }

    } catch (error) {

        console.error(
            "Erro ao recuperar usuário:",
            error
        );

    }

    return null;

}


/* =========================================================
   VERIFICAR LOGIN
   ========================================================= */

function isLoggedIn() {

    return getLoggedUser() !== null;

}


/* =========================================================
   FAZER LOGOUT
   ========================================================= */

function logout() {

    const confirmation =
        confirm(
            "Deseja realmente sair da sua conta?"
        );


    if (!confirmation) {

        return;

    }


    localStorage.removeItem(
        STORAGE_USER
    );

    sessionStorage.removeItem(
        STORAGE_USER
    );


    window.location.href =
        "index.html";

}


/* =========================================================
   REDIRECIONAR PARA LOGIN
   ========================================================= */

function requireLogin() {

    if (!isLoggedIn()) {

        alert(
            "Você precisa estar logado para acessar esta página."
        );

        window.location.href =
            "login.html";

        return false;

    }

    return true;

}


/* =========================================================
   ESCAPAR HTML
   Evita que conteúdo digitado pelo usuário
   seja interpretado como código HTML.
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================================
   INFORMAÇÕES DO USUÁRIO
   ========================================================= */

function getUserProfile() {

    try {

        const profile =
            localStorage.getItem(
                STORAGE_PROFILE
            );


        if (profile) {

            return JSON.parse(profile);

        }

    } catch (error) {

        console.error(
            "Erro ao carregar perfil:",
            error
        );

    }


    return null;

}


/* =========================================================
   SALVAR PERFIL
   ========================================================= */

function saveUserProfile(profile) {

    localStorage.setItem(
        STORAGE_PROFILE,
        JSON.stringify(profile)
    );

}


/* =========================================================
   ATUALIZAR INFORMAÇÕES DO HEADER
   ========================================================= */

function updateHeader() {

    const user =
        getLoggedUser();


    const profile =
        getUserProfile();


    /*
        Procura elementos que possam existir
        em qualquer página.
    */


    const loginButton =
        document.getElementById(
            "loginHeaderButton"
        );


    const profileButton =
        document.getElementById(
            "profileHeaderButton"
        );


    if (user) {

        if (loginButton) {

            loginButton.style.display =
                "none";

        }


        if (profileButton) {

            profileButton.style.display =
                "block";

        }

    } else {

        if (loginButton) {

            loginButton.style.display =
                "block";

        }


        if (profileButton) {

            profileButton.style.display =
                "none";

        }

    }


    /*
        Atualiza nome do usuário caso
        exista um elemento com esse ID.
    */

    const userName =
        document.getElementById(
            "headerUserName"
        );


    if (userName && profile) {

        userName.textContent =
            profile.name;

    }

}


/* =========================================================
   PESQUISA
   ========================================================= */

function performSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {

        return;

    }


    const search =
        input.value.trim();


    if (!search) {

        return;

    }


    window.location.href =
        "index.html?busca=" +
        encodeURIComponent(search);

}


/* =========================================================
   ATIVAR PESQUISA COM ENTER
   ========================================================= */

function setupSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {

        return;

    }


    input.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                performSearch();

            }

        }
    );

}


/* =========================================================
   CRIAR DISCUSSÃO
   ========================================================= */

function createDiscussion(data) {

    const discussions =
        getDiscussions();


    const user =
        getLoggedUser();


    const profile =
        getUserProfile();


    const discussion = {

        id:
            Date.now(),

        title:
            data.title,

        category:
            data.category,

        tags:
            data.tags || [],

        content:
            data.content,

        author:
            profile
                ? profile.name
                : "Usuário",

        authorUsername:
            profile
                ? profile.username
                : "",

        authorId:
            user
                ? user.id
                : null,

        comments:
            [],

        likes:
            0,

        likedBy:
            [],

        createdAt:
            new Date().toISOString()

    };


    discussions.unshift(
        discussion
    );


    saveDiscussions(
        discussions
    );


    return discussion;

}


/* =========================================================
   BUSCAR DISCUSSÃO POR ID
   ========================================================= */

function getDiscussionById(id) {

    const discussions =
        getDiscussions();


    return discussions.find(
        discussion =>
            String(discussion.id) === String(id)
    );

}


/* =========================================================
   CURTIR DISCUSSÃO
   ========================================================= */

function toggleLike(discussionId) {

    const user =
        getLoggedUser();


    if (!user) {

        alert(
            "Entre na sua conta para curtir uma discussão."
        );

        return;

    }


    const discussions =
        getDiscussions();


    const discussion =
        discussions.find(
            item =>
                String(item.id) ===
                String(discussionId)
        );


    if (!discussion) {

        return;

    }


    if (!discussion.likedBy) {

        discussion.likedBy = [];

    }


    const userId =
        user.id;


    const alreadyLiked =
        discussion.likedBy.includes(
            userId
        );


    if (alreadyLiked) {

        discussion.likedBy =
            discussion.likedBy.filter(
                id => id !== userId
            );

        discussion.likes =
            Math.max(
                0,
                discussion.likes - 1
            );

    } else {

        discussion.likedBy.push(
            userId
        );

        discussion.likes++;

    }


    saveDiscussions(
        discussions
    );


    return discussion;

}


/* =========================================================
   ADICIONAR COMENTÁRIO
   ========================================================= */

function addComment(
    discussionId,
    content
) {

    const user =
        getLoggedUser();


    if (!user) {

        alert(
            "Entre na sua conta para comentar."
        );

        return null;

    }


    if (!content || !content.trim()) {

        alert(
            "Digite um comentário."
        );

        return null;

    }


    const profile =
        getUserProfile();


    const discussions =
        getDiscussions();


    const discussion =
        discussions.find(
            item =>
                String(item.id) ===
                String(discussionId)
        );


    if (!discussion) {

        alert(
            "Discussão não encontrada."
        );

        return null;

    }


    if (!discussion.comments) {

        discussion.comments = [];

    }


    const comment = {

        id:
            Date.now(),

        author:
            profile
                ? profile.name
                : "Usuário",

        authorUsername:
            profile
                ? profile.username
                : "",

        authorId:
            user.id,

        content:
            content.trim(),

        likes:
            0,

        createdAt:
            new Date().toISOString()

    };


    discussion.comments.push(
        comment
    );


    saveDiscussions(
        discussions
    );


    return comment;

}


/* =========================================================
   FORMATAÇÃO DE DATA
   ========================================================= */

function formatDate(date) {

    const dateObject =
        new Date(date);


    if (isNaN(dateObject)) {

        return "";

    }


    return dateObject.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


/* =========================================================
   TEMPO RELATIVO
   Exemplo:
   "agora"
   "há 5 minutos"
   "há 2 horas"
   ========================================================= */

function timeAgo(date) {

    const now =
        new Date();


    const past =
        new Date(date);


    const difference =
        now - past;


    const seconds =
        Math.floor(
            difference / 1000
        );


    if (seconds < 60) {

        return "agora";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    if (minutes < 60) {

        return (
            "há " +
            minutes +
            " minuto" +
            (minutes !== 1 ? "s" : "")
        );

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours < 24) {

        return (
            "há " +
            hours +
            " hora" +
            (hours !== 1 ? "s" : "")
        );

    }


    const days =
        Math.floor(
            hours / 24
        );


    if (days < 30) {

        return (
            "há " +
            days +
            " dia" +
            (days !== 1 ? "s" : "")
        );

    }


    return formatDate(
        date
    );

}


/* =========================================================
   PESQUISAR DISCUSSÕES
   ========================================================= */

function searchDiscussions(query) {

    const discussions =
        getDiscussions();


    const search =
        query
            .toLowerCase()
            .trim();


    if (!search) {

        return discussions;

    }


    return discussions.filter(
        discussion => {

            const title =
                discussion.title
                    ?.toLowerCase() || "";


            const content =
                discussion.content
                    ?.toLowerCase() || "";


            const category =
                discussion.category
                    ?.toLowerCase() || "";


            const tags =
                (discussion.tags || [])
                    .join(" ")
                    .toLowerCase();


            return (

                title.includes(search) ||

                content.includes(search) ||

                category.includes(search) ||

                tags.includes(search)

            );

        }
    );

}


/* =========================================================
   RENDERIZAR DISCUSSÕES
   ========================================================= */

function renderDiscussions(
    containerId,
    discussions
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (!discussions.length) {

        container.innerHTML = `

            <div style="
                padding: 30px;
                text-align: center;
                color: #777;
            ">

                Nenhuma discussão encontrada.

            </div>

        `;

        return;

    }


    discussions.forEach(
        discussion => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "discussion";


            element.innerHTML = `

                <span class="category">

                    ${escapeHTML(
                        discussion.category ||
                        "Outros"
                    )}

                </span>


                <h3>

                    ${escapeHTML(
                        discussion.title
                    )}

                </h3>


                <p>

                    ${escapeHTML(
                        discussion.content
                    )}

                </p>


                <div class="discussion-info">

                    <span>

                        👤
                        ${escapeHTML(
                            discussion.author ||
                            "Usuário"
                        )}

                    </span>


                    <span>

                        💬
                        ${
                            discussion.comments
                                ? discussion.comments.length
                                : 0
                        }

                    </span>


                    <span>

                        👍
                        ${
                            discussion.likes || 0
                        }

                    </span>


                    <span>

                        ${timeAgo(
                            discussion.createdAt
                        )}

                    </span>

                </div>

            `;


            element.addEventListener(
                "click",
                function() {

                    openDiscussion(
                        discussion.id
                    );

                }
            );


            container.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   ABRIR DISCUSSÃO
   ========================================================= */

function openDiscussion(id) {

    window.location.href =
        "discussao.html?id=" +
        encodeURIComponent(id);

}


/* =========================================================
   MODAL GENÉRICO
   ========================================================= */

function closeModal(modalId) {

    const modal =
        document.getElementById(
            modalId
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* =========================================================
   FECHAR MODAL CLICANDO FORA
   ========================================================= */

function setupModals() {

    document
        .querySelectorAll(".modal")
        .forEach(
            modal => {

                modal.addEventListener(
                    "click",
                    function(event) {

                        if (
                            event.target ===
                            modal
                        ) {

                            modal.style.display =
                                "none";

                        }

                    }
                );

            }
        );

}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupSearch();

        setupModals();

        updateHeader();

    }
);