import { getCookie } from "./globals/cookies.js";

(async function() {
  const header_buttons = document.querySelector(".header-buttons");

  const username = await getCookie("usr");
  const token    = await getCookie("login_");

  if (username && token)
    header_buttons.querySelector(".register-btn").style.display = "none";
  else
    header_buttons.querySelector("#profileHeaderButton").style.display = "none";
})();