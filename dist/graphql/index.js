"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const todo_1 = __importDefault(require("./model/todo"));
class GraphQL {
    todo;
    constructor(db) {
        this.todo = new todo_1.default(db);
    }
    typeDefs = `
  type Todo {
    taskId: String!
    contents: String
  }

  type Query {
    getTodos: [Todo]
  }
  `;
    resolvers = {
        Query: {
            getTodos: async (root, {}, {}) => {
                return this.todo.getToDos();
            },
        },
    };
    apolloServer = new server_1.ApolloServer({
        typeDefs: this.typeDefs,
        resolvers: this.resolvers,
    });
}
exports.default = GraphQL;
