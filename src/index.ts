import dotenv from 'dotenv';
import { env } from 'process';
import { createServer } from 'http';

dotenv.config();

const app = () => {
  const PORT = env.port;

  const server = createServer((request, response) => {
    console.log(request.url);
    response.end('Hello worlds');
  }).listen(PORT);
};

app();
