import { Tables } from "database-generated.types";
import { Profile } from "../profiles/types";
import { Post } from "../posts/types";
import { Body } from "database.types";

export type Comment = Tables<"comments">;

export type CommentWithRelations = Comment & { owner_id: Profile, post_id: Post };

export type Comments = CommentWithRelations[];

export type CreateCommentBody = Body<"comments">["Insert"];
export type UpdateCommentBody = Body<"comments">["Update"];