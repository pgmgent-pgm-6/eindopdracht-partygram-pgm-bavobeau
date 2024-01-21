import { supabase } from "@core/api/supabase";
import { getCurrentSession } from "../auth/api";
import { uploadImage } from "../files/api";
import { Bucket } from "../files/constants";
import { Profile } from "./types";

export const getProfiles = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .throwOnError();

  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data);
};

export const getProfileById = async (id: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();

  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data);
};

export const updateProfile = async (profile: any) => {
  const session = await getCurrentSession();
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", session?.user.id)
    .single();

  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data);
};

export const updateProfileAvatar = async (avatar: string) => {
  const session = await getCurrentSession();
  // upload file
  const fileName = `${session?.user.id}/${Date.now()}.jpg`;
  await uploadImage(Bucket.Avatars, fileName, avatar);
  // update profile
  const response = await supabase
    .from("profiles")
    .update({ avatar: fileName })
    .eq("id", session?.user.id)
    .throwOnError()
    .single();

  return Promise.resolve(response.data);
};