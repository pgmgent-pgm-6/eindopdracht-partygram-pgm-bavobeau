import { supabase } from "@core/api/supabase";
import { Comments } from "./types";

export const getComments = async (post_id: number): Promise<Comments> => {
  const response = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", post_id)
    .order("created_at", { ascending: true })
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
}