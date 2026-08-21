import express from "express";

import rootPath from "./utils/root-path.js";
import resolveStatic from "./utils/resolve-static.js";
import resolvePages from "./utils/resolve-pages.js";

import notFound from "./routes/not-found.js";
import { GETroot } from "./routes/root.js";
import { GETperfil } from "./routes/perfil.js";
import { GETcadastro } from "./routes/cadastro.js";
import { GETlogin } from "./routes/login.js"
import { GETcriar } from "./routes/criar.js"

import { POSTcreateUser } from "./routes/api/create-user.js"
import { GETusers } from "./routes/api/get-uers.js";
import { POSTlogin } from "./routes/api/login.js";
import { GETdiscussions } from "./routes/api/discussions.js";
import { POSTgetPublicUserInfo } from "./routes/api/public-user-info.js";
import { POSTupdateUserData } from "./routes/api/update-user-data.js";

const app = express();

app.use(express.json());
app.use(express.static(`${rootPath}/static`));

app.get("/", GETroot);
app.get("/perfil", GETperfil);
app.get("/cadastro", GETcadastro);
app.get("/login", GETlogin);
app.get("/criar", GETcriar);

app.post("/api/create-user", POSTcreateUser);
app.post("/api/login", POSTlogin);
app.post("/api/public-user-info", POSTgetPublicUserInfo);
app.post("/api/update-user-data", POSTupdateUserData);
app.get("/api/users", GETusers);
app.get("/api/discussions", GETdiscussions);

//app.use(notFound);
app.use((req, res, next) => {
  res.status(404).sendFile(resolvePages("not-found.html"));
});

export default app;