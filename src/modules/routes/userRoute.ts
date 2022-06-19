import { IncomingMessage, ServerResponse } from 'http';
import { ERROR_MESSAGES, METHODS_HTTP } from '../../constants';
import { User } from '../../data';
import { store } from '../../store';
import { ISlicedRequestURL, IUser } from '../../types';
import { createUUID, isUUIDValid } from '../../utils';

interface userRoute {
  request: IncomingMessage;
  response: ServerResponse;
  slicedRequestURL: ISlicedRequestURL;
}

export const userRoute = (props: userRoute) => {
  const { request, response, slicedRequestURL } = props;

  const { parameters } = slicedRequestURL;
  const method = request.method!;

  const isRequestValid = validateRequest();

  if (!isRequestValid) {
    return response.writeHead(404, ERROR_MESSAGES.amountParametersExceeded).end();
  }

  const router = {
    [METHODS_HTTP.GET]: () => (parameters.length === 0 ? getAllUsers(props) : getUser(props)),
    [METHODS_HTTP.POST]: () => postUser(props),
    [METHODS_HTTP.PUT]: () => putUser(props),
    [METHODS_HTTP.DELETE]: () => deleteUser(props),
  };

  router[method]();

  function validateRequest(): boolean {
    return parameters.length > 1 ? false : true;
  }
};

async function getAllUsers(props: userRoute): Promise<void> {
  const { response } = props;

  const allUsers = await store.getAllUsers();

  response.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(allUsers));
}

async function getUser(props: userRoute) {
  const { response, slicedRequestURL } = props;

  const { parameters } = slicedRequestURL;
  const [firstParameter] = parameters;

  const isFirstParameterValid = isUUIDValid(firstParameter);

  if (!isFirstParameterValid) {
    return response.writeHead(400, ERROR_MESSAGES.userIdInvalid).end();
  }

  const user = await store.getUser(firstParameter);

  if (user) {
    return response
      .writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(user));
  } else {
    return response.writeHead(404, ERROR_MESSAGES.userNotExist).end();
  }
}

async function postUser(props: userRoute): Promise<void> {
  const { request, response } = props;

  const id = createUUID();
  let data = '';

  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', async () => {
    const user = new User({ ...JSON.parse(data), id });
    const isValid = validateUser(user);

    if (isValid) {
      await store.postUser(user);
      response.writeHead(201, { 'Content-Type': 'application/json' }).end(JSON.stringify(user));
    } else {
      response.writeHead(400, ERROR_MESSAGES.notRequiredFields).end();
    }
  });

  function validateUser(user: IUser) {
    const haveEmptyField = Object.values(user).some((value) => value === undefined);
    return !haveEmptyField;
  }
}

async function putUser(props: userRoute) {
  const { request, response, slicedRequestURL } = props;

  const { parameters } = slicedRequestURL;
  const [firstParameter] = parameters;
  let data = '';

  const isFirstParameterValid = isUUIDValid(firstParameter);

  if (!isFirstParameterValid) {
    return response.writeHead(400, ERROR_MESSAGES.userIdInvalid).end();
  }

  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', async () => {
    const user = await store.getUser(firstParameter);
    const { id } = { ...user };

    if (!user) {
      return response.writeHead(404, ERROR_MESSAGES.userNotExist).end();
    }

    const updatedUser = new User({ ...user, ...JSON.parse(data), id });

    await store.putUser(updatedUser);
    response
      .writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(updatedUser));
  });
}

async function deleteUser(props: userRoute) {
  const { response, slicedRequestURL } = props;

  const { parameters } = slicedRequestURL;
  const [firstParameter] = parameters;

  const isFirstParameterValid = isUUIDValid(firstParameter);

  if (!isFirstParameterValid) {
    return response.writeHead(400, ERROR_MESSAGES.userIdInvalid).end();
  }

  const isUserDeleted = await store.deleteUser(firstParameter);

  if (isUserDeleted) {
    return response.writeHead(204).end();
  } else {
    return response.writeHead(404, ERROR_MESSAGES.userNotExist).end();
  }
}
