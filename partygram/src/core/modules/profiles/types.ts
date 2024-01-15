export type Profile = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  condition: boolean;
  avatar?: string | null;
};