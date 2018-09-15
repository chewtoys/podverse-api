import { baseResolver } from './base'

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
