import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, unauthorizedError } from '../../helpers/http-helper'
import { Controller, EmailValidator, httpRequest, httpResponse, Authentication } from './login-protocols'

export class LoginControler implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authetication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authetication = authentication
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const requiredFileds = ['email', 'password']
      for (const field of requiredFileds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authetication.auth(email, password)
      if (!accessToken) {
        return unauthorizedError()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
