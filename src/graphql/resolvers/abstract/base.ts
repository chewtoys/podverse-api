import { createResolver } from 'apollo-resolvers'
import { isInstance } from 'apollo-errors'
import { UnknownError, UnauthorizedError } from 'errors'

export const baseResolver = createResolver(
  null,
  (root, args, context, error) => {
    console.log('baseResolver')
    // console.log('root', root)
    // console.log('args', args)
    // console.log('context', context)
    // console.log('error', error)

    if (isInstance(error)) {
      console.log('is instance!')
      // console.log(error)
      return error
    }
    console.log('is not instance!')
    // return new UnknownError({
    //   data: {
    //     name: error.name
    //   }
    // })
  }
)

export const isAuthenticatedResolver = baseResolver.createResolver(
  (root, args, context, error) => {
    console.log('isAuthenticatedResolver')
    // console.log(context)
    // console.log('root', root)
    // console.log('args', args)
    // console.log('context', context)
    // console.log('error', error)
    // console.log('isAuthenticated Re solver er')
    // console.log(args)
    // console.log(args)
    // return new UnauthorizedError()
  }
)
