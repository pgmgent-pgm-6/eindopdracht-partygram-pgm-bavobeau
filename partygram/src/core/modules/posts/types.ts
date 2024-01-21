import { Tables } from "database-generated.types";
import { Profile } from "../profiles/types";
import { Body } from "database.types";

export type Post = Tables<"posts">;

export type PostWithRelations = Post & { owner_id: Profile };

export type Posts = PostWithRelations[];

export type CreatePostBody = Body<"posts">["Insert"];
export type UpdatePostBody = Body<"posts">["Update"];