import { Tables } from "database-generated.types";
import { Post } from "../posts/types";
import { Body } from "database.types";
import { Profile } from "../profiles/types";

export type Like = Tables<"likes">;

export type LikeWithRelations = Like & { post_id: Post, owner_id: Profile };

export type Likes = LikeWithRelations[];

export type CreateLikeBody = Body<"likes">["Insert"];
export type UpdateLikeBody = Body<"likes">["Update"];