import isVoid from "@core/utils/isVoid";
import { Bucket } from "../files/constants";
import { getPublicUrl } from "../files/utils";
import { Post } from "./types";

export const getPostImageUrl = (post?: Post | null) => {
  if (!post || isVoid(post.image)) {
    return null;
  }
  return getPublicUrl(Bucket.Posts, post.image);
};