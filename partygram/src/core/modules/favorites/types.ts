import { Tables } from "database-generated.types";
import { Post } from "../posts/types";
import { Profile } from "../profiles/types";
import { Body } from "database.types";

export type Favorite = Tables<"favorites">;

export type FavoriteWithRelations = Favorite & { post_id: Post, owner_id: Profile };

export type Favorites = FavoriteWithRelations[];

export type CreateFavoriteBody = Body<"favorites">["Insert"];
export type UpdateFavoriteBody = Body<"favorites">["Update"];