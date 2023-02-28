import { makeLoginValidation } from "./login-validation"
import { ValidationComposite, RequiredFieldsValidation, EmailValidation } from "../../../presentation/helpers/validators/index"
import { Validation } from "../../../presentation/protocols/validation"
import { EmailValidator } from "../../../presentation/protocols/emailValidator"

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeLoginValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe ('LoginValidation Factory', () => {
  test('deve chamar ValidationComposite com todas as validações', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new EmailValidation('email', makeLoginValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})