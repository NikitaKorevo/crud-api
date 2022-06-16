import { IUserRoute } from '../../../types';

export function userRoute(): IUserRoute {
  return {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
  };
}

function getUsers() {
  console.log('getUsers');
  return null;
}

function getUser() {
  console.log('getUser');
  return null;
}

function postUser() {
  console.log('postUser');
  return null;
}

function putUser() {
  console.log('putUser');
  return null;
}

function deleteUser() {
  console.log('1');
  return null;
}
