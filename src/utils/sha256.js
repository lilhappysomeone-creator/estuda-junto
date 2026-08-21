export default async function sha256(text) {
  const msg_buffer = new TextEncoder().encode(text);
  const hash_buffer = await crypto.subtle.digest('SHA-256', msg_buffer);
  const hash_array = Array.from(new Uint8Array(hash_buffer));
  const hash_hex = hash_array.map(b => b.toString(16).padStart(2, '0')).join('');

  return hash_hex;
}