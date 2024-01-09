import { supabase } from "@core/api/supabase";
import { Session } from "@supabase/supabase-js";
import { CreateUserBody, UpdateUserBody } from "./types";
import { uploadImage } from "../files/api";
import { Bucket } from "../files/constants";

export const getCurrentSession = async (): Promise<Session | null> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return null;
  }
  return session;
};

export type LoginBody = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginBody) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data.user);
};

export const logout = async () => {
  return supabase.auth.signOut();
};

export const createUser = async (user: CreateUserBody) => {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
      },
    },
  });

  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data.user);
};

export const updateUser = async (body: UpdateUserBody) => {
  const { email, password, ...user } = body;

  const { data, error } = await supabase.auth.updateUser({
    email: email,
    data: {
      ...user,
    },
  });

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(data.user);
};

export const updateUserAvatar = async (avatar: string) => {
  const session = await getCurrentSession();
  // upload file
  const fileName = `${session?.user.id}/${Date.now()}.jpg`;
  await uploadImage(Bucket.Avatars, fileName, avatar);

  const { data, error } = await supabase.auth.updateUser({
    data: {
      ...session?.user.user_metadata, // first_name, last_name, avatar (previous)
      avatar: fileName,
    },
  });

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(data.user);
};