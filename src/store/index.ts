import { IUser } from '../types/';

class Store {
  users: Array<IUser> = [
    {
      id: '9c5aed2b-dbbf-494d-80fb-cd6da1e20937',
      username: 'Nikita',
      age: '24',
      hobbies: ['programming'],
    },
    {
      id: '850ddbad-5ecf-49ed-b66a-7c6e7ca19197',
      username: 'Mike',
      age: '48',
      hobbies: ['cooking', 'drawing'],
    },
    {
      id: '28685bd2-ec4f-43aa-9e9d-b889070639d7',
      username: 'Daniel',
      age: '96',
      hobbies: ['swimming'],
    },
  ];

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
