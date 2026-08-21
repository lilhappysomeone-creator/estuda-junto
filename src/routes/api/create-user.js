import { request, response } from "express";

import supabase from "../../utils/supabase-client.js";
import sha256 from "../../utils/sha256.js";

class ResponseMessage {
  constructor(status, message = "") {
    this.status = status;
    this.message = message;
  }
}

async function checkUserExists(username = "") {
  const { data, error } = await supabase.from("Users").select("*").eq("username", username);
  // TODO: Gerenciar possíveis erros

  if (data.length !== 0)
    return true;
  
  return false;
}

export async function POSTcreateUser(req = request, res = response) {
  const user_data = req.body;

  if (!user_data.name || !user_data.username || !user_data.email || !user_data.password) {
    res.send(new ResponseMessage(406, "Dados inválidos."));
    return;
  }

  const name     = user_data.name;
  const username = user_data.username;
  const email    = user_data.email;
  const password = await sha256(user_data.password);

  if ((await checkUserExists(username))) {
    res.status(406).send(new ResponseMessage(406, "Usuário indisponível"));
    return;
  }

  if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email)) {
    res.status(406).send(new ResponseMessage(406, "Email inválido"));
    return;
  }

  const login_token = await sha256(`${name}.${username}`);
  const { data, error } =  await supabase.from("Users").insert({
    name,
    username,
    email,
    password,
    discussions: [],
    bio: "",
    login_token
  });
  if (error) {
    console.error(error);
    res.status(error.code).send(new ResponseMessage(error.code, error.details));
    return;
  }

  res.status(201).send({
    status: 201,
    username,
    login_token
  });
}