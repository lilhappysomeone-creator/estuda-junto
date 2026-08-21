import { request, response } from "express";
import resolvePages from "../utils/resolve-pages.js";

export default function notFound(req = request, res = response, next = NextFunction) {
  res.status(404).sendFile(resolvePages("not-found.html"));
}