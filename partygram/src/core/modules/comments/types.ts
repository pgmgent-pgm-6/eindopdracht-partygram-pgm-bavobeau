export type Comment = {
  id: number;
  created_at: string;
  post_id: number;
  owner_id: string;
  description: string;
}

export type Comments = Comment[];

export type CreateCommentBody = {
  post_id: number;
  description: string;
  owner_id: string;
}