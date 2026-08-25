export async function setCookie(key, value) {
  await cookieStore.set(key, value);
}

export async function getCookie(key) {
  return await cookieStore.get(key);
}

export async function delCookie(key) {
  return await cookieStore.delete(key);
}