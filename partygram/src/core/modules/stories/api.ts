import { supabase } from "@core/api/supabase";
import { Story, Stories, CreateStoryBody } from "./types";

export const getStories = async (): Promise<Stories> => {
  const response = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError()
    .limit(10);

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const getStoryById = async (uid: string): Promise<Story> => {
  const response = await supabase
    .from("stories")
    .select("*")
    .eq("id", uid)
    .throwOnError()
    .single();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const getOwnerIdFromStoryToday = async () => {
  const response = await supabase
    .from("stories")
    .select("owner_id")
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .throwOnError();

  if (response.error) {
    throw response.error;
  }
  const uniqueOwnerIds = Array.from(new Set(response.data.map(item => item.owner_id)));
  
  return Promise.resolve(uniqueOwnerIds);
};

export const createStory = async (story: CreateStoryBody): Promise<Story> => {
  const response = await supabase
    .from("stories")
    .insert(story)
    .throwOnError()
    .single();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const deleteStory = async (id: string | number) => {
  const response = await supabase
    .from("stories")
    .delete()
    .eq("id", id)
    .throwOnError()
    .single();
  return Promise.resolve(response.data);
};

export const getStoriesByUserIdFromToday = async (
  id: string
): Promise<Stories> => {
  const response = await supabase
    .from("stories")
    .select("*")
    .eq("owner_id", id)
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const getStoriesByUserId = async (id: string): Promise<Stories> => {
  const response = await supabase
    .from("stories")
    .select("*")
    .eq("owner_id", id)
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
}