import { FastifyPluginCallback } from "fastify";

// Generate a list of unique and random numbers with a length 'amount'
const getRandomNumbers = (amount: number) => {
  const numbers: number[] = [];

  const getRand = () => {
    const rand = Math.ceil(Math.random() * 100);
    if (numbers.includes(rand)) {
      getRand();
    } else {
      numbers.push(rand);
    }
  };

  for (let i = 0; i < amount; i++) {
    getRand();
  }

  return numbers;
};

const randRoute: FastifyPluginCallback = (fastify, _, next) => {
  fastify.get<{ Params: { amount: number } }>(
    "/rand/:amount",
    (request, reply) => {
      const randomNumbers = getRandomNumbers(request.params.amount);
      reply.send(randomNumbers);
    }
  );
  next();
};

export default randRoute;
