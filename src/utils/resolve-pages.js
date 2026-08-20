import rootPath from "./root-path.js";

export default function resolvePages(path = "") {
  if (!path.includes(".html"))
    return `${rootPath}/pages/not-fount.html`;

  return `${rootPath}/pages/${path}`;
}