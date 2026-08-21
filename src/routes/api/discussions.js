import { request, response } from "express";

import supabase from "../../utils/supabase-client.js";

async function getDiscussions() {
  const { data, error } = await supabase.from("Discussions").select("*");
  return data;
}

export async function GETdiscussions(req = request, res = response) {
  const data = await getDiscussions();
  if (!data) {
    res.status(500).send({
      status: 500,
      message: "Cannot query database"
    });
    return;
  }

  res.send(data.map((discussion) => {
    return {
      author: discussion.author,
      title: discussion.title,
      question: discussion.question,
      tags: discussion.tags,
      comments: discussion.comments.length,
      likes: discussion.likes.length,
      created_at: discussion.created_at
    }
  }));
}