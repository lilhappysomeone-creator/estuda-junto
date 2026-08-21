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

const app = express();

app.use(express.static(`${rootPath}/static`));

app.get("/", GETroot);
app.get("/perfil", GETperfil);
app.get("/cadastro", GETcadastro);
app.get("/login", GETlogin);
app.get("/criar", GETcriar);

//app.use(notFound);
app.use((req, res, next) => {
  res.status(404).sendFile(resolvePages("not-found.html"));
});

export default app;