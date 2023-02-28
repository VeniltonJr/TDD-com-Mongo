import { makeSignUpValidation } from "./signup-validation"
import { ValidationComposite, RequiredFieldsValidation, EmailValidation, CompareFieldsValidation } from "../../../presentation/helpers/validators/index"
import { Validation } from "../../../presentation/protocols/validation"
import { EmailValidator } from "../../../presentation/protocols/emailValidator"

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe ('SignUpValidation Factory', () => {
  test('deve chamar ValidationComposite com todas as validações', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})