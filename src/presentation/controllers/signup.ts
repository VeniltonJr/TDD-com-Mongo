import { MissingParamError } from '../errors/missingParamError'
import { httpRequest, httpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controllers'
import { EmailValidator } from '../protocols/emailValidator'
import { InvalidParamError } from '../errors/invalidParamError'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: httpRequest): httpResponse {
    const requireFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
