export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: Date; // timestamp of creation
  updatedAt: Date; // timestamp of last update
}

export type UserResponse = Omit<User, 'password' | 'createdAt' | 'updatedAt'> & {
  createdAt: number;
  updatedAt: number;
};

export const toResponseUser = (user: User): UserResponse => {
  return {
    id: user.id,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
    version: user.version,
    login: user.login
  };
};
