"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
require("dotenv/config");
const db_1 = require("./db");
const graphql_1 = __importDefault(require("./graphql"));
const dev = process.env.NODE_ENV !== 'production';
const nextApp = (0, next_1.default)({ dev, isNodeDebugging: true });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 8080;
async function main() {
    try {
        /**
         * GraphQLクラス定義
         */
        const graphQl = new graphql_1.default(db_1.db);
        await graphQl.apolloServer.start();
        await nextApp.prepare();
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        /**
         * GraphQL(ApolloServer)のミドルウェア
         */
        app.use('/graphql', (0, express4_1.expressMiddleware)(graphQl.apolloServer));
        app.all('*', (req, res) => {
            return handle(req, res);
        });
        app.listen(port, (err) => {
            if (err)
                throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}
main();
