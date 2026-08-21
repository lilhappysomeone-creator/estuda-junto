import { request, response } from "express";

import supabase from "../../utils/supabase-client.js";
import sha256 from "../../utils/sha256.js";

class ResponseMessage {
  constructor(status, message = "") {
    this.status = status;
    this.message = message;
  }
}

export async function POSTlogin(req = request, res = response) {
  const user_data = req.body;

  if (!user_data.email || !user_data.password) {
    res.status(406).send(new ResponseMessage(406, "Dados inválidos"));
    return;
  }

  const email = user_data.email;
  const password = await sha256(user_data.password);

  const { data, error } = await supabase.from("Users").select("*").eq("email", email).eq("password", password);

  if (data.length === 0) {
    res.status(404).send(new ResponseMessage(404, "Usuário não encontrado"));
    return;
  }

  const username = data[0].username;
  const login_token = await sha256(`${username}`);

  await supabase.from("Users").update({ login_token }).eq("username", username);
  res.status(202).send({
    status: 202,
    username,
    login_token
  });
}