export type Post = {
  id: string;
  description: string;
  createdAt: string;
  owner_id: string;
  image: string;
  location: string;
};

export type Posts = Post[];