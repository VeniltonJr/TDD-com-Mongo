import { ValidationComposite, RequiredFieldsValidation, EmailValidation } from '../../../presentation/helpers/validators/index'
import { Validation } from "../../../presentation/protocols/validation"
import { EmailValidatorAdapter } from '../../../utils/email-validatorAdapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(field))
    }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
