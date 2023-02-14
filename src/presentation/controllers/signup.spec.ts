import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('se o nome não for informado retorna 400', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('faltou preencher o campo: nome'))
  })
})
