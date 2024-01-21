import { Tables } from "database-generated.types";
import { Profile } from "../profiles/types";
import { Body } from "database.types";

export type Story = Tables<"stories">;

export type StoryWithRelations = Story & { owner_id: Profile };

export type Stories = StoryWithRelations[];

export type CreateStoryBody = Body<"stories">["Insert"];
export type UpdateStoryBody = Body<"stories">["Update"];