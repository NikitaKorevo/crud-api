import { userRoute } from '../routes/userRoute';
import { ISlicedRequestURL } from '../../types';
import { ENDPOINTS } from '../../constants/';
import { IncomingMessage, ServerResponse } from 'http';

interface IRouterProps {
  request: IncomingMessage;
  response: ServerResponse;
  slicedRequestURL: ISlicedRequestURL;
}

export function router(props: IRouterProps) {
  const { endpoint } = props.slicedRequestURL;

  switch (endpoint) {
    case ENDPOINTS.apiUsers:
    case ENDPOINTS.apiUser:
      userRoute(props);
      break;

    default:
      break;
  }
}
