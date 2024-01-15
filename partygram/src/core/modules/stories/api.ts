import { supabase } from "@core/api/supabase";
import { Story, Stories } from "./types";

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

export const getLastStoriesFromLastDay = async () => {
  const response = await supabase
    .from("stories")
    .select("owner_id, id")
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000))
    .order("owner_id, created_at", { ascending: false })
    .throwOnError();

  // Extracting the latest story for each owner
  const latestStories = [];
  const seenOwners = new Set();

  if (!response.data) return Promise.resolve([]);
  for (const story of response.data) {
    if (!seenOwners.has(story.owner_id)) {
      latestStories.push(story);
      seenOwners.add(story.owner_id);
      seenOwners.add(story.id);
    }
  }

  return Promise.resolve(latestStories);
};

export const createStory = async (story: Story): Promise<Story> => {
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

export const getStoriesByUser = async (
  id: string | number
): Promise<Stories> => {
  const response = await supabase
    .from("stories")
    .select("*")
    .eq("owner_id", id)
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};
