import { LoginControler } from './login'
import { badRequest, ok, serverError, unauthorizedError } from '../../helpers/http/http-helper'
import { MissingParamError } from '../../errors'
import { httpRequest, Authentication, Validation, AuthenticationModel } from './login-protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (imput: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

const makeFakeRequest = (): httpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

interface sutTypes {
  sut: LoginControler
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): sutTypes => {
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new LoginControler(authenticationStub, validationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

describe('Login Controller', () => {

  test('Deve chamar Authentication com valores corretos', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Deve retonar 401 se for infomado credenciais invalidas', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorizedError())
  })

  test('Deve retonar 500 se Authetication enviar um excessao', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Deve retonar 200 se for infomado credenciais validas', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('deve chamar Validation com o valores corretos', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('deve retornar 400 se Validation retornar um erro', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('aoba'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('aoba')))
  })
})
