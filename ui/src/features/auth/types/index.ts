export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type UserResponse = {
  user: AuthUser;
};
