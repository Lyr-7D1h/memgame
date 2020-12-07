import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { FastifyPluginAsync } from "fastify";
import path from "path";
import fp from "fastify-plugin";

const DB_PATH = process.env.DATABASE_PATH
  ? process.env.DATABASE_PATH
  : path.join(__dirname, "../../memgame.db");

declare module "fastify" {
  interface FastifyInstance {
    sqlite: sqlite3.Database;
  }
}

const sqlitePlugin: FastifyPluginAsync = async (fastify) => {
  if (process.env.NODE_ENV === "development") {
    sqlite3.verbose();
  }
  const sqlite = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  fastify.decorate("sqlite", sqlite);
};

export default fp(sqlitePlugin, { name: "sqlite" });
