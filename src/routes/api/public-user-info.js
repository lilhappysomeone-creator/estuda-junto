import { request, response } from "express";

import supabase from "../../utils/supabase-client.js";

export async function POSTgetPublicUserInfo(req = request, res = response) {
  const { data } = await supabase.from("Users").select("*").eq("username", req.body.username);

  if (data.length === 0) {
    res.status(404).send({
      status: 404,
      message: "User not found"
    });
    return;
  }

  const user = data[0];
  

  res.status(200).send({
    status: 200,
    name: user.name,
    username: user.username,
    discussions: user.discussions.length,
    bio: user.bio
  });
}