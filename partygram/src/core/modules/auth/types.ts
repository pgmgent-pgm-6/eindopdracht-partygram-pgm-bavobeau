export type UserMetaData = {
  username: string;
  first_name: string;
  last_name: string;
  condition: boolean;
  avatar?: string | null;
};

export type User = {
  id: string;
  email: string;
};

export type CreateUserBody = {
  email: string;
  password: string;
} & UserMetaData;

export type UpdateUserBody = Partial<
  {
    id: string
    email: string;
    password?: string;
  }
>;