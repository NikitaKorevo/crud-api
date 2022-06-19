import dotenv from 'dotenv';
import { env } from 'process';
import { createServer } from 'http';
import { router } from './modules/router/';
import { sliceRequestURL } from './utils';

dotenv.config();

const app = (): void => {
  const { PORT } = env;

  const server = createServer((request, response) => {
    const slicedRequestURL = sliceRequestURL(request);

    router({ request, response, slicedRequestURL });
  }).listen(PORT);
};

app();
