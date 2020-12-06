import { FastifyPluginCallback } from "fastify";

const scoreBoardRoute: FastifyPluginCallback = async (fastify, _, done) => {
  await fastify.sqlite.exec(
    "CREATE TABLE IF NOT EXISTS scoreboard (username TEXT, score INT, cardCount INT)"
  );

  fastify.get("/scoreboard", async (_request, reply) => {
    const result = await fastify.sqlite.all("SELECT * FROM scoreboard");
    reply.send(result);
  });

  fastify.post<{
    Body: { username: string; cardCount: number; score: number };
  }>(
    "/scoreboard",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            username: { type: "string" },
            score: { type: "number" },
            cardCount: { type: "number" },
          },
          required: ["username", "cardCount", "score"],
        },
      },
      preValidation: (request, _, done) => {
        const usernameLength = request.body.username.length;
        console.log(request.body.cardCount);
        if (usernameLength < 0 || usernameLength > 29) {
          done(new Error("Username length must be between 1-29"));
        } else if (request.body.score > 1200) {
          done(new Error("Score can't be higher then what's possible"));
        } else {
          done();
        }
      },
    },
    async (request, reply) => {
      await fastify.sqlite.run(
        `INSERT INTO scoreboard (username, score, cardCount) VALUES (?, ?, ?)`,
        [request.body.username, request.body.score, request.body.cardCount]
      );
      reply.send({ message: "success" });
    }
  );
  done();
};

export default scoreBoardRoute;
