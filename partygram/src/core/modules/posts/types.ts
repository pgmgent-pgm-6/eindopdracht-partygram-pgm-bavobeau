export type Post = {
  id: number;
  description: string;
  created_at: Date;
  owner_id: string;
  image: string;
  location: string;
  total_likes: number;
};

export type Posts = Post[];

export type CreatePostBody = {
  owner_id: string;
  description: string;
  image: string;
  location?: string;
};

export type UpdatePostBody = {
  id: number;
  image: string;
}