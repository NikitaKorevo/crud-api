import { IncomingMessage } from 'http';
import { ISlicedRequest } from '../types';

export const sliceRequest = (request: IncomingMessage) => {
  const method = request.method;
  const [basePath, routeName, ...parameters] = request.url?.split('/').filter(Boolean) || [];

  const slicedRequest: ISlicedRequest = {
    method,
    basePath,
    routeName,
    parameters,
  };

  return slicedRequest;
};
