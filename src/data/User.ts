import { IUser } from '../types';

export class User implements IUser {
  id: string;
  username: string;
  age: string;
  hobbies: Array<string>;

  constructor(userData: IUser) {
    const { id, username, age, hobbies } = userData;

    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}
