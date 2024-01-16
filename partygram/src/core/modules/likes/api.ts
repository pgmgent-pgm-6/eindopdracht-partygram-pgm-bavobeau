import { supabase } from "@core/api/supabase";
import { Like } from "./types";

export const getLikeByPostAndOwner = async (
  post_id: number,
  owner_id: string
): Promise<Like> => {
  const response = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", post_id)
    .eq("owner_id", owner_id)
    .throwOnError()
    .single();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const createLike = async (
  post_id: number,
  owner_id: string
): Promise<Like> => {
  const response = await supabase
    .from("likes")
    .insert([{ post_id, owner_id }])
    .single();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const deleteLike = async (
  post_id: number,
  owner_id: string
): Promise<Like> => {
  const response = await supabase
    .from("likes")
    .delete()
    .eq("post_id", post_id)
    .eq("owner_id", owner_id)
    .single();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};
