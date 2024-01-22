import { Tables } from "database-generated.types";
import { Body } from "database.types";

export type Profile = Tables<"profiles">;

export type CreateProfileBody = Body<"profiles">["Insert"];
export type UpdateProfileBody = Body<"profiles">["Update"];