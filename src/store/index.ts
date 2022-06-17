import { IUser } from '../types/';

class Store {
  users: Array<IUser> = [
    {
      id: '1',
      username: 'Nikita',
      age: '24',
      hobbies: ['programming'],
    },
    {
      id: '2',
      username: 'Nikita',
      age: '111',
      hobbies: ['programming'],
    },
    {
      id: '3',
      username: 'Nikita',
      age: '111',
      hobbies: ['programming'],
    },
  ];

  getAllUsers = async () => {
    return this.users;
  };

  getUser = async (userId: string) => {
    return this.users.filter(({ id }) => id === userId);
  };
}

export const store = new Store();
