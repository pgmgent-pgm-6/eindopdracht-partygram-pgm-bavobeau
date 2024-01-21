import { supabase } from "@core/api/supabase";
import { Favorites } from "./types";

export const getFavoriteByPostAndUser = async (owner_id: string, post_id: number): Promise<Favorites> => {
  const response = await supabase
    .from("favorites")
    .select("*")
    .eq("owner_id", owner_id)
    .eq("post_id", post_id)
    .single()
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
}

export const getPostFavoritesByUser = async (owner_id: string): Promise<Favorites> => {
  const response = await supabase
    .from("favorites")
    .select("*, post_id(*)")
    .eq("owner_id", owner_id)
    .order("created_at", { ascending: false })
    .throwOnError();
  
  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
}

export const createFavorite = async (owner_id: string, post_id: number): Promise<Favorites> => {
  const response = await supabase
    .from("favorites")
    .insert({ owner_id, post_id })
    .single()
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const deleteFavorite = async (owner_id: string, post_id: number): Promise<Favorites> => {
  const response = await supabase
    .from("favorites")
    .delete()
    .match({ owner_id, post_id })
    .single()
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
}