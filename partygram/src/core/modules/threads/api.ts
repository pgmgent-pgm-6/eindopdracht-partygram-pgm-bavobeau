import { supabase } from "@core/api/supabase";
import { Thread, Threads, CreateThreadBody, ThreadsWithRelations } from "./types";

export const getThreadsById = async (uid: string): Promise<Threads> => {
  const response = await supabase
    .from("threads")
    .select("*")
    .eq("owner_id", uid)
    .or(`receiver_id.eq.${uid}`)
    .order("created_at", { ascending: false })
    .throwOnError();

  if (response.error) {
    throw response.error;
  }

  return Promise.resolve(response.data);
}

export const getLastThreads = async (uid: string): Promise<Threads | null> => {
  const { data, error } = await supabase
    .from("threads")
    .select("*, receiver_id(*), owner_id(*)")
    .or(`owner_id.eq.${uid}, receiver_id.eq.${uid}`)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  // Create an array to store the last thread for each user ID
  const lastThreads: Thread[] = [];

  // If there is no data, return null
  if (!data || data.length === 0) {
    return Promise.resolve(lastThreads);
  }

  // Create a map to keep track of the latest thread for each user ID
  const latestThreadsMap: { [userId: string]: Thread } = {};

  // Iterate through the results and update the latestThreadsMap
  data.forEach((thread: Thread) => {
    const userId = thread.owner_id.id === uid ? thread.receiver_id.id : thread.owner_id.id;

    if (!latestThreadsMap[userId]) {
      latestThreadsMap[userId] = thread;
    }
  });

  // Extract the values from the map to get the final array of last threads
  Object.values(latestThreadsMap).forEach((thread: Thread) => {
    lastThreads.push(thread);
  });

  return Promise.resolve(lastThreads);
};