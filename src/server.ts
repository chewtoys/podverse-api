import { ApolloServer } from 'apollo-server-koa'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import resolvers from 'graphql/resolvers'
import typeDefs from 'graphql/types'
import { databaseInitializer } from 'initializers/database'
import { formatError } from 'apollo-errors'

const bootstrap = async () => {
  await databaseInitializer()

  const server = new ApolloServer({
    context: ({ ctx }) => (ctx),
    typeDefs,
    resolvers,
    formatError: error => {
      return ({
        message: error.message,
        name: error.extensions.exception.name
      })
    }
  })
  const app = new Koa()
  app.use(bodyParser())

  // const router = new Router()

  // router.get('/login', (ctx, next) => {
  //   ctx.cookies.set('asdf', 'cookie cookie cookie!')
  //   next()
  // })

  // app.use(router.routes())

  const path = '/graphql'

  server.applyMiddleware({ app, path })

  app.listen({ port: 2001 }, () => {
    console.log(`🚀 Server ready at http://localhost:2001${server.graphqlPath}`)
  })
}

bootstrap()
