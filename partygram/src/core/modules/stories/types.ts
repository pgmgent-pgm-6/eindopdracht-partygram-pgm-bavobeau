export type Story = {
  id: number;
  created_at: string;
  owner_id: string;
  image: string;
  location?: string;
}

export type Stories = Story[]

export type StoriesOwners = {
  id: number;
  owner_id: string;
} [];

export type CreateStoryBody = {
  owner_id: string;
  image: string;
  location?: string;
};