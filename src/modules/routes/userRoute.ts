import { IncomingMessage, ServerResponse } from 'http';
import { METHODS_HTTP } from '../../constants';
import { store } from '../../store';
import { ISlicedRequestURL } from '../../types';

interface IRouterProps {
  request: IncomingMessage;
  response: ServerResponse;
  slicedRequestURL: ISlicedRequestURL;
}

export function userRoute({ request, response, slicedRequestURL }: IRouterProps): void {
  console.log('this userRoute!!!');

  const { parameters } = slicedRequestURL;
  const [firstParameter] = parameters;
  const method = request.method!;
  console.log(parameters);

  validateParameters();

  const switch1 = {
    [METHODS_HTTP.GET]: () => (parameters.length === 0 ? getAllUsers() : getUser()),
    [METHODS_HTTP.POST]: () => postUser(),
    [METHODS_HTTP.PUT]: () => putUser(),
    [METHODS_HTTP.DELETE]: () => deleteUser(),
  };

  switch1[method]();

  function validateParameters() {
    if (parameters.length > 1) {
      console.log('Error: parameters > 1!');
    }
  }

  async function getAllUsers() {
    console.log('getUsers');

    const allUsers = await store.getAllUsers();

    response.statusCode = 200;
    response.end(JSON.stringify(allUsers));
    return null;
  }

  async function getUser() {
    console.log('getUser');
    const user = await store.getUser(firstParameter);

    response.statusCode = 200;
    response.end(JSON.stringify(user));
    return null;
  }

  async function postUser() {
    console.log('postUser');
    return null;
  }

  async function putUser() {
    console.log('putUser');
    return null;
  }

  async function deleteUser() {
    console.log('1');
    return null;
  }
}
