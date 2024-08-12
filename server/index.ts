import type { Request, Response } from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import next from 'next'
import 'dotenv/config'
import { db } from './db'
import GraphQL from './graphql'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev, isNodeDebugging: true })
const handle = nextApp.getRequestHandler()
const port = process.env.PORT || 8080

async function main() {
  
  try {
    /**
     * GraphQLクラス定義
     */
    const graphQl = new GraphQL(db)
    await graphQl.apolloServer.start()

    await nextApp.prepare()
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    /**
     * GraphQL(ApolloServer)のミドルウェア
     */
    app.use(
      '/graphql',
      expressMiddleware(graphQl.apolloServer),
    )
    app.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    app.listen(port, (err?: unknown) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
