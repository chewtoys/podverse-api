import { createError } from 'apollo-errors'

// AuthenticationErrors

export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred.'
})

export const UnauthorizedError = createError('UnauthorizedError', {
  message: 'You must login to do that.'
})

export const AlreadyAuthenticatedError = createError('AlreadyAuthenticatedError', {
  message: 'You are already authenticated.'
})

export const ForbiddenError = createError('Forbidden', {
  message: 'You are not allowed to do that.'
})

// ValidationErrors

export const InvalidEmailError = createError('InvalidEmailError', {
  message: 'Invalid email.',
  data: {
    something: 'important'
  },
  internalData: {
    error: `The SQL server died.`
  }
})
