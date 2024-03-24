export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: Date; // timestamp of creation
  updatedAt: Date; // timestamp of last update
}

export type UserResponse = Omit<User, 'password'>;

export const toResponseUser = (user: User): UserResponse => {
  const { password, ...rest } = user;
  return rest;
};
