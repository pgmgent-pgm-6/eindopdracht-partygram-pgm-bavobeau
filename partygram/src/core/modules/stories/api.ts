import { supabase } from "@core/api/supabase";
import { Storie, Stories } from "./types";

export const getStories = async (): Promise<Stories | null> => {
  const { data } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError()
    .limit(10);
  return Promise.resolve(data);
}

export const getStorieById = async (uid: string | number) => {
  const response = await supabase
    .from("stories")
    .select("*")
    .eq("id", uid)
    .throwOnError()
    .single();

  return Promise.resolve(response.data);
}

export const createStorie = async (storie: Storie) => {
  const response = await supabase
    .from("stories")
    .insert(storie)
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
}

export const deleteStorie = async (id: string | number) => {
  const response = await supabase
    .from("stories")
    .delete()
    .eq("id", id)
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
}