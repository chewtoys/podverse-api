import { getRepository } from 'typeorm'
import { User } from 'entities'
import { validate } from 'class-validator'
import { logError } from 'utility'
import { InvalidEmailError } from 'errors'
import { formatError, ApolloError } from 'apollo-errors'
import { isAuthenticatedResolver } from './abstract/auth'
import { GraphQLError } from 'graphql';

const relations = ['playlists']

const createUser = isAuthenticatedResolver.createResolver(
  (root, args, ctx) => {
    console.log('createUser')
    // console.log(context)
    const repository = getRepository(User)
    const newUser = new User()

    newUser.email = args.patch.email
    newUser.password = args.patch.password

    ctx.cookies.set('asdf', 'cookies for me!')

    // context.res.redirect('https://google.com')

    return validate(newUser)
      .then(async errors => {

        // throw new InvalidEmailError()

        if (errors.length > 0) {
          for (let error of errors) {
            throw new ApolloError(Object.keys(error.constraints)[0], { message: error.constraints[Object.keys(error.constraints)[0]] }, null)
          }
        }

        await repository.save(newUser)

        return {
          ...newUser
        }
      })
  }
)

export default {
  Mutation: {
    createUser,
    async deleteUser (_, { id }) {
      const repository = getRepository(User)
      const user = await repository.findOne({ id })
      await repository.delete(id)
      return { ...user }
    },
    async updateUser (_, { id, patch }) {
      const repository = getRepository(User)
      const user = await repository.findOne({ id })
      const newUser = Object.assign(user, patch)
      await repository.save(newUser)
      return {
        ...newUser
      }
    }
  },
  Query: {
    user (obj, { id }, context, info) {
      const repository = getRepository(User)
      return repository.findOne({ id }, { relations })
    },
    users (obj, args, context, info) {
      const repository = getRepository(User)
      return repository.find({ relations })
    }
  }
}
