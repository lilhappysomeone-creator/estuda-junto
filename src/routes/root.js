import { request, response } from "express";
import resolveStatic from "../utils/resolve-static.js";
import resolvePages from "../utils/resolve-pages.js";

export function GETroot(req = request, res = response) {
  res.sendFile(resolvePages("index.html"));
}