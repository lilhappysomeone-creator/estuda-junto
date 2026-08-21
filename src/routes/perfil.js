import { request, response } from "express";
import resolveStatic from "../utils/resolve-static.js";
import resolvePages from "../utils/resolve-pages.js";

export function GETperfil(req = request, res = response) {
  res.sendFile(resolvePages("perfil.html"));
}