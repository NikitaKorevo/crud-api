import { IUser } from '../types/';

class Store {
  users: Array<IUser> = [];

  getAllUsers = async (): Promise<Array<IUser>> => {
    return this.users;
  };

  getUser = async (userId: string) => {
    return this.users.find(({ id }) => id === userId);
  };

  postUser = async (user: IUser): Promise<boolean> => {
    this.users.push(user);
    return true;
  };

  putUser = async (updatedUser: IUser): Promise<IUser> => {
    this.users = this.users.map((user) => {
      return user.id === updatedUser.id ? updatedUser : user;
    });
    return updatedUser;
  };

  deleteUser = async (userId: string) => {
    let isUserDeleted = false;

    this.users = this.users.filter(({ id }) => {
      if (id !== userId) {
        return true;
      } else {
        isUserDeleted = true;
        return false;
      }
    });

    return isUserDeleted;
  };
}

export const store = new Store();
