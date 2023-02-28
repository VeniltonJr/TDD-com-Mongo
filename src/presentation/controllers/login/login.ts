import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorizedError } from '../../helpers/http/http-helper'
import { Controller, httpRequest, httpResponse, Authentication, Validation } from './login-protocols'

export class LoginControler implements Controller {
  private readonly validation: Validation
  private readonly authetication: Authentication

  constructor (authentication: Authentication, validation: Validation) {
    this.validation = validation
    this.authetication = authentication
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if(error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authetication.auth({
        email,
        password
      })
      if (!accessToken) {
        return unauthorizedError()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
