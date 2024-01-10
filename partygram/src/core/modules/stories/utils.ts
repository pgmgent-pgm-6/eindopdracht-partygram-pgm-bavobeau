import isVoid from "@core/utils/isVoid";
import { Bucket } from "../files/constants";
import { getPublicUrl } from "../files/utils";
import { Storie } from "./types";

export const getAvatarUrl = (storie?: Storie | null) => {
  if (!storie || isVoid(storie.image)) {
    return null;
  }
  return getPublicUrl(Bucket.Stories, storie.image);
};