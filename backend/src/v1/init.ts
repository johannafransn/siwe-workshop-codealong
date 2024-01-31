import { FastifyInstance } from 'fastify';
import { utils } from '@/helpers/utils';
import { ERROR500, STANDARD } from '@/helpers/constants';

const Home = async (app: FastifyInstance) => {
  app.all('/', async (req, rep) => {
    rep.code(STANDARD.SUCCESS).send({ ok: true });
  });

  app.get('/health-check', async (req, rep) => {
    try {
      await utils.healthCheck(); //status 200
      rep.code(STANDARD.SUCCESS);
    } catch (e) {
      rep.code(ERROR500.statusCode);
    }
  });
};

export default Home;
