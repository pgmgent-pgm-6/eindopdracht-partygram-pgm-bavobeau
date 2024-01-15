import isVoid from "@core/utils/isVoid";
import { Bucket } from "../files/constants";
import { getPublicUrl } from "../files/utils";
import { Story } from "./types";

export const getStoryImageUrl = (story?: Story | null) => {
  if (!story || isVoid(story.image)) {
    return null;
  }
  return getPublicUrl(Bucket.Stories, story.image);
};