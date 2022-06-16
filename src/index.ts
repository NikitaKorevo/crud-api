import dotenv from 'dotenv';
import { env } from 'process';
import { createServer } from 'http';
import { router } from './modules/router/router';
import { sliceRequest } from './utils/sliceRequest';

dotenv.config();

const app = () => {
  const PORT = env.port;

  const server = createServer((request, response) => {
    const slicedRequest = sliceRequest(request);
    const result = router(slicedRequest);
    console.log(slicedRequest);

    response.end('hello world!');
  }).listen(PORT);
};

app();
