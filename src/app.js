import express from "express";

import rootPath from "./utils/root-path.js";
import resolveStatic from "./utils/resolve-static.js";
import { GETroot } from "./routes/root.js";
import notFound from "./routes/not-found.js";

const app = express();

app.use(express.static(`${rootPath}/static`));

app.get("/", GETroot);

app.use(notFound);

export default app;