import rootPath from "./root-path.js";

export default function resolveStatic(path = "") {
  return `${rootPath}/static/${path}`;
}