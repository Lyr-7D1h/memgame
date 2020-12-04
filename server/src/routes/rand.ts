import { FastifyPluginCallback } from "fastify";
const randRoute: FastifyPluginCallback = (fastify, _, next) => {
  fastify.get<{ Params: { amount: number } }>(
    "/rand/:amount",
    (request, reply) => {
      const randomNumbers = [];
      for (let i = 0; i < request.params.amount; i++) {
        randomNumbers.push(Math.round(Math.random() * 100));
      }
      reply.send(randomNumbers);
    }
  );
  next();
};

export default randRoute;
