import { InvalidParamError } from "../../errors"
import { CompareFieldsValidation } from "./compare-fields-validations"

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe ('CompareFields Validation', () => {

  test ('deve retornar um InvalidParamError se a validacao falhar', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value'
      })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test ('nao deve retornar nada se a validacao funcionar', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
      })
    expect(error).toBeFalsy()
  })
})