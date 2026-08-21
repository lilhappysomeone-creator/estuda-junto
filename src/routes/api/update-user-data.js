import { request, response } from "express";

import supabase from "../../utils/supabase-client.js";

export async function POSTupdateUserData(req = request, res = response) {
  const body = req.body;

  if (!body.token || !body.username) {
    res.status(403).send({
      status: 403,
      message: "Você PRECISA estar conectado com uma conta e com uma sessão válida para fazer essa operação"
    });
    return;
  }

  const { data } = await supabase
    .from("Users")
    .select("*")
    .eq("username", body.username)
    .eq("login_token", body.token);

  if (data.length !== 1) {
    console.log(body);
    res.status(500).send({ status: 500, message: "Algo deu errado" });
    return;
  }

  const { updatedata, error } = await supabase.from("Users").update({
    name: body.new_name,
    username: body.new_username,
    bio: body.new_bio
  })
  .eq("username", body.username)
  .eq("login_token", body.token);

  if (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }

  console.log(updatedata);

  res.status(200).send({
    status: 200,
    message: "Dados Atualizados"
  });
}