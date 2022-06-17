import { IncomingMessage } from 'http';
import { ISlicedRequestURL } from '../types';

export const sliceRequestURL = (request: IncomingMessage) => {
  const [section, routeName, ...parameters] = request.url?.split('/').filter(Boolean) || [];

  const endpoint = [section, routeName].join('/');

  const slicedRequestURL: ISlicedRequestURL = {
    endpoint,
    parameters: parameters || [],
  };

  return slicedRequestURL;
};
