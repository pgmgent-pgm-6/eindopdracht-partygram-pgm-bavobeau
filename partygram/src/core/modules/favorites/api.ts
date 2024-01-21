import { supabase } from "@core/api/supabase";
import { Favorites } from "./types";

export const getFavoritesByUser = async (owner_id: string): Promise<Favorites> => {
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
};