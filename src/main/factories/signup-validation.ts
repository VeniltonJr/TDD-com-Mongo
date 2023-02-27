import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldsValidation } from '../../presentation/helpers/validators/required-fields-validation'
import { Validation } from "../../presentation/helpers/validators/validation"
import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-fields-validations"
import { EmailValidatorAdapter } from '../../utils/email-validatorAdapter'
import { EmailValidation } from '../../presentation/helpers/validators/email-validations'

export const makeSignUpValidation = (): ValidationComposite => {
  
  const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(field))
    }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
  
}
