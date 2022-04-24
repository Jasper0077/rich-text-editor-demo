import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import path from "path";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { isLocalhost } from "./constants";
import { Post } from "./entities/Post";
import { PostResolver } from "./resolvers/post";
import { MyContext } from "./types";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "rted",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post]
  })

  const app = express();

  app.set("trust proxy", true);

  app.use(
    cors({
      origin: isLocalhost ? "http://localhost:3000" : "https://studio.apollographql.com",
      credentials: true
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false
    }),
    context: ({ req, res }): MyContext => ({ em: conn.manager, req, res })
  });

  const corsOptions = {
    credentials: true,
    origin: isLocalhost? "http://localhost:3000" : "https://studio.apollographql.com"
  }
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  app.get('/', (_, res) => {
    res.send("Hello world!");
  });

  const httpServer = createServer(app);
  httpServer.listen(4000, () => {
    console.log("Server is up on port 4000");
  });
}

console.log("Backend running");
main().catch(err => {
  console.error(err);
});