import { Validator, ValidatorConstraint, ValidatorConstraintInterface,
  ValidationArguments } from 'class-validator'

const validator = new Validator()

@ValidatorConstraint({ name: 'IsValidPassword', async: false })
export class IsValidPassword implements ValidatorConstraintInterface {

  validate (text: string, args: ValidationArguments) {
    let hasMinLength = false
    // let hasUppercase = false
    // let hasLowercase = false
    // let hasNumber = false

    // console.log('text', text)

    // console.log('args', args)

    if (validator.minLength(text, 8)) {
      hasMinLength = true
    } else {
      return false
    }

    if (hasMinLength) {
      return true
    } else {
      return false
    }
  }

  defaultMessage (args: ValidationArguments) {
    // console.log(args)
    return 'helloooooooo'
  }

}