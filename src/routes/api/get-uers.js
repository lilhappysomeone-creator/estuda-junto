import { request, response } from "express";

import supabase from "../../utils/supabase-client.js";

export async function GETusers(req = request, res = response) {
  const { data, error } = await supabase.from("Users").select("*");

  res.send(data);
}