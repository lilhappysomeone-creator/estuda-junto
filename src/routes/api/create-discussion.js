import { request, response } from "express";

import supabase from "../../utils/supabase-client.js";
import sha256 from "../../utils/sha256.js";

async function findUser(username = "", token = "") {
  const { data, error } = await supabase.from("Users").select("*").eq("username", username).eq("login_token", token);
  if (error) {
    console.error("[ERR] Cannot fetch from 'Users' while quering a user to create a discussion.");
    return false;
  }

  if (data.length === 0) {
    return false;
  }

  return data.at(0);
}

export async function POSTcreateDiscussion(req = request, res = response) {
  const body = req.body;
  if (!body.username || !body.token) {
    res.status(403).send({ status: 403, message: "Acesso negado" });
    return;
  }

  const username = body.username.trim();
  const token = body.token.trim();
  if (username === "" || token === "") {
    res.status(403).send({ status: 403, message: "Credenciais inválidas" });
    return;
  }

  const user = await findUser(username, token);
  if (!user) {
    res.status(403).send({ status: 403, message: "Acesso negado" });
    return;
  }

  const { data, error } = await supabase.from("Discussions").insert({
    author: user.name,
    author_id: user.id,
    title: body.discussion.title,
    question: body.discussion.question
  });
  if (error) {
    res.status(500).send({
      status: 500,
      message: error.cause
    });
    return;
  }

  res.status(201).send({
    status: 201,
    message: "OK"
  });
}