import { supabase } from "@core/api/supabase";
import { Story, Stories } from "./types";

export const getStories = async (): Promise<Stories | null> => {
  const { data } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError()
    .limit(10);
  return Promise.resolve(data);
}

export const getStoryById = async (uid: string | number) => {
  const response = await supabase
    .from("stories")
    .select("*")
    .eq("id", uid)
    .throwOnError()
    .single();

  return Promise.resolve(response.data);
}

export const getOwnersWithStoryFromLastDay = async (): Promise<string[] | null> => {
  const response = await supabase
    .from("stories")
    .select("owner_id")
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000))
    .order("created_at", { ascending: true })
    .throwOnError();
    
  if (!response.data) return null;
  const uniqueOwnerIds = [...new Set(response.data.map(story => story.owner_id))];

  return Promise.resolve(uniqueOwnerIds);
}

export const createStory = async (story: Story) => {
  const response = await supabase
    .from("stories")
    .insert(story)
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
}

export const deleteStory = async (id: string | number) => {
  const response = await supabase
    .from("stories")
    .delete()
    .eq("id", id)
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
}