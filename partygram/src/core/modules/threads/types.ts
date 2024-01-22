import { Tables } from "database-generated.types";
import { Profile } from "../profiles/types";
import { Body } from "database.types";

export type Thread = Tables<"threads">;

export type ThreadsWithRelations = Thread & { owner_id: Profile, receiver_id: Profile };

export type Threads = ThreadsWithRelations[];

export type CreateThreadBody = Body<"threads">["Insert"];
export type UpdateThreadBody = Body<"threads">["Update"];