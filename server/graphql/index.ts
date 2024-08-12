import type { BaseContext } from '@apollo/server'
import { ApolloServer } from '@apollo/server'
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import ToDo from './model/todo'

class GraphQL {
  private todo: ToDo

  constructor(db: NeonHttpDatabase<Record<string, never>>) {
    this.todo = new ToDo(db)
  }

  private typeDefs = `
  type Todo {
    taskId: String!
    contents: String
  }

  type Query {
    getTodos: [Todo]
  }
  `
  private resolvers = {
    Query: {
      getTodos: async (root: unknown, {}, {}) => {
        return this.todo.getToDos()
      },
    },
  }

  public apolloServer = new ApolloServer<BaseContext>({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers,
  })
}
export default GraphQL
