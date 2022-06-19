import { userRoute } from '../routes/userRoute';
import { ISlicedRequestURL } from '../../types';
import { ENDPOINTS, ERROR_MESSAGES } from '../../constants/';
import { IncomingMessage, ServerResponse } from 'http';

interface IRouterProps {
  request: IncomingMessage;
  response: ServerResponse;
  slicedRequestURL: ISlicedRequestURL;
}

export function router(props: IRouterProps) {
  const { request, response, slicedRequestURL } = props;
  const { endpoint } = slicedRequestURL;

  switch (endpoint) {
    case ENDPOINTS.apiUsers:
    case ENDPOINTS.apiUser:
      userRoute(props);
      break;

    default:
      response.writeHead(404, ERROR_MESSAGES.endpointNotExist).end();
      break;
  }
}
