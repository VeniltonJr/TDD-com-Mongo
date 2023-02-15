import { MissingParamError } from '../errors/missingParamError'
import { httpRequest, httpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controllers'

export class SignUpController implements Controller {
  handle (httpRequest: httpRequest): httpResponse {
    const requireFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
