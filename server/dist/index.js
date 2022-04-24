"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const post_1 = require("./resolvers/post");
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "123456",
        database: "rted",
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [Post_1.Post]
    });
    const app = (0, express_1.default)();
    app.set("trust proxy", true);
    app.use((0, cors_1.default)({
        origin: constants_1.isLocalhost ? "http://localhost:3000" : "https://studio.apollographql.com",
        credentials: true
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [post_1.PostResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ em: conn.manager, req, res })
    });
    const corsOptions = {
        credentials: true,
        origin: constants_1.isLocalhost ? "http://localhost:3000" : "https://studio.apollographql.com"
    };
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: corsOptions });
    app.get('/', (_, res) => {
        res.send("Hello world!");
    });
    const httpServer = (0, http_1.createServer)(app);
    httpServer.listen(4000, () => {
        console.log("Server is up on port 4000");
    });
};
console.log("Backend running");
main().catch(err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map