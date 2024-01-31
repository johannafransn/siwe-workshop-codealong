import fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import accepts from '@fastify/accepts';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';

import Home from './v1/init';
import Session from './v1/session/route';

const startServer = async () => {
  try {
    const server = fastify()
      .withTypeProvider<TypeBoxTypeProvider>()
      .register(accepts)
      .register(cors)
      .register(formbody)
      .register(helmet)
      .register(rateLimit)
      .register(fastifyCookie)
      .register(fastifySession, { secret: 'a secret with minimum length of 32 characters' })
      .register(Home)
      .register(Session, { prefix: '/v1/session' })


    const serverOptions = {
      port: Number(process.env.PORT) || 5000,
      host: '0.0.0.0', // @dev listen on all IPv4 interfaces
    };

    server.listen(serverOptions, (err, address) => {
      if (err) {
        console.error(`Server ERROR ${err}`);
        process.exit(1);
      }
      console.log(`Server listening on ${address}`);
    });
  } catch (e) {
    console.error(e);
  }
};

process.on('unhandledRejection', (e) => {
  console.error(e);
  process.exit(1);
});

startServer();
