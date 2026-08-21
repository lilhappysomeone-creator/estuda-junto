export async function getCookie(key) {
  return await cookieStore.get(key);
}