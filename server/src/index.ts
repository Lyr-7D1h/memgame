import fastify from "fastify";
import fastifyAutoload from "fastify-autoload";
import fastifyStatic from "fastify-static";
import path from "path";
import pino from "pino";

const server = fastify({
  logger: pino({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    prettyPrint: process.env.NODE_ENV === "development",
  }),
});

if (process.env.NODE_ENV === "production") {
  server.register(fastifyStatic, {
    root: path.join(__dirname, "../../client/build"),
  });
}

server
  .register(fastifyAutoload, {
    dir: path.join(__dirname, "plugins"),
  })
  .register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
    options: { prefix: "api" },
  });

server.listen(5000, "0.0.0.0", (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  if (process.env.NODE_ENV === "development") {
    console.log(server.printRoutes());
  }
});
