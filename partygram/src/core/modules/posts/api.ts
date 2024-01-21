import { supabase } from "@core/api/supabase";
import { CreatePostBody, Post, Posts } from "./types";

export const getPosts = async (): Promise<Posts> => {
  const response = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .throwOnError()
    .single();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
}

export const createPost = async (post: CreatePostBody): Promise<Post> => {
  const response = await supabase
    .from("posts")
    .insert(post)
    .single()
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const getPostsByUser = async (id: string): Promise<Posts> => {
  const response = await supabase
    .from("posts")
    .select("*")
    .eq("owner_id", id)
    .throwOnError()
    .order("created_at", { ascending: false });

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
};

export const getPostsBySearch = async (search: string): Promise<Posts> => {
  const {data, error} = await supabase
    .from("posts")
    .select()
    .textSearch("description", `"${search}"`)
    .throwOnError();

  if (error) {
    throw error;
  }

  return Promise.resolve(data);
}